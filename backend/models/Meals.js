const mongoose = require('mongoose');

const MealSchema = new mongoose.Schema({
  name: String,
  icon: String,
  time: String,
  calories: Number,
  protein: Number,
  carbs: Number,
  fats: Number,
});

module.exports = mongoose.model('Meal', MealSchema);
// This code defines a Mongoose schema and model for a meal, which includes fields for the meal's name, icon, time, and nutritional information (calories, protein, carbs, fats). The model is then exported for use in other parts of the application.