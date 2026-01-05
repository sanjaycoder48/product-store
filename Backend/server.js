
import express from 'express';
import cors from 'cors';


const app = express();
app.use(cors());
app.use(express.json());

import productRoutes from './routes/productRoutes.js';
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} `);
});


app.get("/", (req, res) => {
    res.send("hello from backend");
})