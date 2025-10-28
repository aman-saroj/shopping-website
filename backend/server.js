// ✅ Importing Modules
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');  
const userRoutes = require('./routes/userRoutes'); 
const productRoutes = require('./routes/productRoutes'); 
const cartRoutes = require('./routes/cartRoutes');     
const adminRoutes = require('./routes/adminRoutes');
// ← UNCOMMENT THESE LATER (after creating files)
const orderRoutes = require('./routes/orderRoutes');   
// const paymentRoutes = require('./routes/paymentRoutes'); 

// ✅ Initialize Express App
const app = express();

// ✅ Middleware
app.use(express.json()); 
app.use(cors());         

// ✅ Connect to MongoDB
connectDB();

// ✅ Test Route
app.get('/', (req, res) => {
    res.send('API is working fine');
});

// ✅ API Routes
app.use('/api/users', userRoutes);        
app.use('/api/products', productRoutes);  
app.use('/api/cart', cartRoutes);         
app.use('/api/admin', adminRoutes);
// ← UNCOMMENT THESE LATER
app.use('/api/orders', orderRoutes);    
// app.use('/api/payment', paymentRoutes);   

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});