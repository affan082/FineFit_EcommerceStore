const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();

app.use(cors({
  origin: [process.env.CLIENT_URL, 'http://localhost:5173'],
  credentials: true,
}));
app.use(express.json());

app.get('/', (req, res) => res.send('API is running...'));

app.use('/api/auth', require('../routes/authRoutes'));
app.use('/api/products', require('../routes/productRoutes'));
app.use('/api/cart', require('../routes/cartRoutes'));
app.use('/api/orders', require('../routes/orderRoutes'));

let isConnected = false;

app.use(async (req, res, next) => {
  if (isConnected) return next();
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    isConnected = conn.connections[0].readyState === 1;
    next();
  } catch (err) {
    res.status(500).json({ message: 'Database connection failed' });
  }
});

module.exports = app;