const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Connect to MongoDB (database: food_delivery)
mongoose.connect('mongodb://127.0.0.1:27017/food_delivery')
  .then(() => console.log('🍃 MongoDB Connected Successfully to: food_delivery'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// 2. Payment & Order Schema (strict: false guarantees EVERYTHING is saved)
const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  customer: { type: String, default: 'Vino' },
  customerName: { type: String, default: 'Vino' },
  customerEmail: { type: String, default: '' },
  phone: { type: String, default: '' },
  address: { type: String, default: '' },
  paymentMethod: { type: String, default: 'Cash on Delivery' },
  items: { type: Array, default: [] },
  subtotal: { type: Number, default: 0 },
  deliveryFee: { type: Number, default: 0 },
  taxes: { type: Number, default: 0 },
  total: { type: Number, required: true },
  time: { type: String, default: () => new Date().toLocaleString() }
}, { timestamps: true, strict: false });

const Order = mongoose.model('Order', orderSchema);

// 3. POST Endpoint to Save Payment & Order into MongoDB
app.post('/api/order', async (req, res) => {
  console.log('👉 [INCOMING ORDER]:', req.body.orderId, '| Total: ₹' + req.body.total, '| Mode:', req.body.paymentMethod);
  try {
    const orderData = req.body;
    if (!orderData.customer && orderData.customerName) orderData.customer = orderData.customerName;
    if (!orderData.customerName && orderData.customer) orderData.customerName = orderData.customer;

    const newOrder = new Order(orderData);
    const savedOrder = await newOrder.save();
    
    console.log('✅ [SAVED TO MONGODB]: Order ID', savedOrder.orderId, 'Mongo Document ID:', savedOrder._id);
    return res.status(201).json({ success: true, message: 'Payment recorded in MongoDB!', order: savedOrder });
  } catch (error) {
    console.error('❌ [SAVE ERROR]:', error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
});

// 4. GET Endpoint to View All Payment History
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    console.log(`📦 Returned ${orders.length} orders from MongoDB`);
    return res.json(orders);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// 5. Food Menu Endpoints
const foodSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  isVeg: Boolean,
  image: String,
  desc: String
});
const Food = mongoose.model('Food', foodSchema);

app.get('/api/foods', async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (err) {
    res.json([]);
  }
});

app.post('/api/foods', async (req, res) => {
  try {
    const newFood = new Food(req.body);
    await newFood.save();
    res.status(201).json(newFood);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/foods/:id', async (req, res) => {
  try {
    await Food.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Backend server is running on http://localhost:${PORT}`);
});
