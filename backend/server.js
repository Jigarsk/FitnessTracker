const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');

// Import routes
const mealRoutes = require('./Routes/mealRoutes');
const workoutRoutes = require('./Routes/workoutRoutes'); // Import the workout routes
const profileRoutes = require('./Routes/profileRoutes');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI , {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Test route
app.get('/', (req, res) => {
  res.send('🍽️ Meal API and Workout API are running!');
});

// Meal Routes
app.use('/api/meals', mealRoutes);

// Workout Routes
app.use('/api/workouts', workoutRoutes); // Add workout routes to the server
app.use('/api/profile', profileRoutes); // 

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
