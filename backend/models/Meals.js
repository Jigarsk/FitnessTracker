const mongoose = require('mongoose');

const MealSchema = new mongoose.Schema({
  name: String,
  category: String, // Add this line
  icon: String,
  time: String,
  calories: Number,
  protein: Number,
  carbs: Number,
  fats: Number,
});

module.exports = mongoose.model('Meal', MealSchema);
