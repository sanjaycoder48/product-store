import pool from './db.js';

const addProducts = async () => {
    try {
        console.log('Connecting to database...');

        const newProducts = [
            {
                name: '4K Ultra Gaming Monitor',
                price: 499.99,
                description: '32-inch 144Hz IPS display for the ultimate gaming setup.',
                image_url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80',
                category: 'Computers'
            },
            {
                name: 'Smart Home Hub',
                price: 129.00,
                description: 'Control all your smart devices from one central voice-activated hub.',
                image_url: 'https://images.unsplash.com/photo-1558002038-1091a166111c?w=800&q=80',
                category: 'Smart Home'
            },
            {
                name: 'Noise-Cancelling Earbuds',
                price: 199.99,
                description: 'True wireless earbuds with active noise cancellation and transparency mode.',
                image_url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80',
                category: 'Audio'
            },
            {
                name: 'Robot Vacuum Cleaner',
                price: 349.50,
                description: 'Smart robot vacuum with mapping technology and app control.',
                image_url: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=800&q=80',
                category: 'Home Appliances'
            },
            {
                name: 'Electric Standing Desk',
                price: 450.00,
                description: 'Adjustable height desk with memory presets for a healthy workflow.',
                image_url: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=800&q=80',
                category: 'Furniture'
            }
        ];

        console.log(`Adding ${newProducts.length} new products...`);

        for (const p of newProducts) {
            await pool.query(
                'INSERT INTO products (name, price, description, image_url, category, stock) VALUES ($1, $2, $3, $4, $5, 15)',
                [p.name, p.price, p.description, p.image_url, p.category]
            );
        }

        console.log('✅ Successfully added new products!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error adding products:', error);
        if (error.code === 'ECONNREFUSED') {
            console.error('\n⚠️  Could not connect to the database. Is PostgreSQL running?');
        }
        process.exit(1);
    }
};

addProducts();
