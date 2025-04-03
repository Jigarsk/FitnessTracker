const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Meal = require('./models/Meals')


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://Jigar:Jigar@cluster0myfitnee.xoheyqt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0myfitnee", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// API Endpoints
app.post('/meals', async (req, res) => {
  try {
    const newMeal = new Meal(req.body);
    const savedMeal = await newMeal.save();
    res.status(201).json(savedMeal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/meals', async (req, res) => {
  try {
    const meals = await Meal.find();
    res.status(200).json(meals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(5000, () => console.log('Server running on port 5000'));
