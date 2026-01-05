import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Client } = pg;

// Configuration for connecting to the default 'postgres' database
// This allows us to create the 'product_store' database if it doesn't exist
const defaultClientConfig = {
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: 'postgres', // Connect to default DB first
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
};

const targetDbName = process.env.DB_NAME || 'product_store';

const setupDatabase = async () => {
    let client;
    try {
        console.log('Connecting to default postgres database...');
        client = new Client(defaultClientConfig);
        await client.connect();

        // Check if target database exists
        const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = '${targetDbName}'`);
        if (res.rowCount === 0) {
            console.log(`Database '${targetDbName}' not found. Creating...`);
            await client.query(`CREATE DATABASE "${targetDbName}"`);
            console.log(`Database '${targetDbName}' created successfully.`);
        } else {
            console.log(`Database '${targetDbName}' already exists.`);
        }
    } catch (err) {
        if (err.code === 'ECONNREFUSED') {
            console.error('\n❌ CRITICAL ERROR: Could not connect to PostgreSQL.');
            console.error('   Please ensure the PostgreSQL service is running on your computer.');
            console.error('   Default port: 5432. Host: localhost.\n');
            process.exit(1);
        } else if (err.code === '28P01') {
            console.error('\n❌ AUTH ERROR: Invalid password for user "postgres".');
            console.error('   Please update the DB_PASSWORD in your Backend/.env file.\n');
            process.exit(1);
        }
        console.error('Error during database check:', err);
        process.exit(1);
    } finally {
        if (client) await client.end();
    }

    // Now connect to the actual product_store database to create tables and seed
    const targetDbConfig = {
        ...defaultClientConfig,
        database: targetDbName,
    };

    let targetClient;
    try {
        console.log(`\nConnecting to '${targetDbName}' to setup schema...`);
        targetClient = new Client(targetDbConfig);
        await targetClient.connect();

        console.log('Creating "products" table...');
        await targetClient.query(`
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                price DECIMAL(10, 2) NOT NULL,
                description TEXT,
                image_url TEXT,
                category VARCHAR(100),
                stock INT DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Check for products
        const countRes = await targetClient.query('SELECT count(*) FROM products');
        if (parseInt(countRes.rows[0].count) === 0) {
            console.log('Seeding products...');
            const products = [
                {
                    name: 'Wireless Noise-Canceling Headphones',
                    price: 129.99,
                    description: 'Experience crystal clear sound with our premium wireless headphones.',
                    image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
                    category: 'Audio'
                },
                {
                    name: 'Ultra HD Smart Watch',
                    price: 249.50,
                    description: 'Stay connected and track your health with this sleek smart watch.',
                    image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
                    category: 'Wearables'
                },
                {
                    name: 'Professional Camera Drone',
                    price: 899.00,
                    description: 'Capture breathtaking aerial footage with 4K resolution.',
                    image_url: 'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=800&q=80',
                    category: 'Cameras'
                },
                {
                    name: 'Mechanical Gaming Keyboard',
                    price: 89.99,
                    description: 'RGB backlit mechanical keyboard for the ultimate gaming experience.',
                    image_url: 'https://images.unsplash.com/photo-1587829741301-dc798b91a05e?w=800&q=80',
                    category: 'Accessories'
                },
                {
                    name: 'Portable Bluetooth Speaker',
                    price: 59.99,
                    description: 'Compact speaker with powerful sound and waterproof design.',
                    image_url: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80',
                    category: 'Audio'
                }
            ];

            for (const p of products) {
                await targetClient.query(
                    'INSERT INTO products (name, price, description, image_url, category, stock) VALUES ($1, $2, $3, $4, $5, 20)',
                    [p.name, p.price, p.description, p.image_url, p.category]
                );
            }
            console.log(`✅ successfully seeded ${products.length} products.`);
        } else {
            console.log('Products already exist in the database.');
        }

    } catch (err) {
        console.error('Error during schema setup:', err);
    } finally {
        if (targetClient) await targetClient.end();
    }
};

setupDatabase();
