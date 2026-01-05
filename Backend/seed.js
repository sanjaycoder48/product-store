import pool from './db.js';

const seed = async () => {
    try {
        console.log('Creating table...');
        await pool.query(`
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

        console.log('Checking for existing products...');
        const res = await pool.query('SELECT count(*) FROM products');
        if (parseInt(res.rows[0].count) > 0) {
            console.log('Products already exist. Skipping seed.');
            process.exit(0);
        }

        console.log('Inserting products...');
        const products = [
            {
                name: 'Wireless Headphones',
                price: 99.99,
                description: 'Premium noise-cancelling wireless headphones with 30h battery life.',
                image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60',
                category: 'Audio'
            },
            {
                name: 'Smart Watch Series 5',
                price: 299.99,
                description: 'Advanced smartwatch with health tracking and GPS.',
                image_url: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&auto=format&fit=crop&q=60',
                category: 'Wearables'
            },
            {
                name: '4K Action Camera',
                price: 199.50,
                description: 'Capture your adventures in stunning 4K resolution.',
                image_url: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop&q=60',
                category: 'Cameras'
            },
            {
                name: 'Gaming Laptop',
                price: 1299.00,
                description: 'High-performance gaming laptop with RTX 4060 graphics.',
                image_url: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&auto=format&fit=crop&q=60',
                category: 'Computers'
            },
            {
                name: 'Bluetooth Speaker',
                price: 49.99,
                description: 'Portable bluetooth speaker with deep bass.',
                image_url: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop&q=60',
                category: 'Audio'
            }
        ];

        for (const p of products) {
            await pool.query(
                'INSERT INTO products (name, price, description, image_url, category, stock) VALUES ($1, $2, $3, $4, $5, 10)',
                [p.name, p.price, p.description, p.image_url, p.category]
            );
        }

        console.log('Seed completed successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Seed failed:', error);
        process.exit(1);
    }
};

seed();
