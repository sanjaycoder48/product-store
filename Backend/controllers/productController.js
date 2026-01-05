import pool from '../db.js';

// Mock data to serve when Database is not connected
const mockProducts = [
    {
        id: 1,
        name: 'Basic Wireless Headphones (Mock)',
        price: 99.99,
        description: 'Premium noise-cancelling wireless headphones. (Served from Mock Data)',
        image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60',
        category: 'Audio',
        stock: 10
    },
    {
        id: 2,
        name: 'Smart Watch Series 5 (Mock)',
        price: 299.99,
        description: 'Advanced smartwatch with health tracking and GPS. (Served from Mock Data)',
        image_url: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&auto=format&fit=crop&q=60',
        category: 'Wearables',
        stock: 15
    },
    {
        id: 3,
        name: '4K Action Camera (Mock)',
        price: 199.50,
        description: 'Capture your adventures in stunning 4K resolution. (Served from Mock Data)',
        image_url: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop&q=60',
        category: 'Cameras',
        stock: 5
    },
    {
        id: 4,
        name: 'Gaming Laptop (Mock)',
        price: 1299.00,
        description: 'High-performance gaming laptop with RTX 4060 graphics. (Served from Mock Data)',
        image_url: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&auto=format&fit=crop&q=60',
        category: 'Computers',
        stock: 3
    }
];

export const getProducts = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products');
        res.json(result.rows);
    } catch (error) {
        console.log("Database connection failed. Serving mock data.");
        res.json(mockProducts);
    }
};

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);

        if (result.rows.length === 0) {
            // Check mock data if not found in DB (or if query returned empty but didn't throw)
            const mock = mockProducts.find(p => p.id === parseInt(id));
            if (mock) return res.json(mock);
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.log("Database connection failed. Serving mock data for ID:", req.params.id);
        const mock = mockProducts.find(p => p.id === parseInt(req.params.id));
        if (mock) return res.json(mock);
        res.status(500).json({ message: 'Server Error' });
    }
};
