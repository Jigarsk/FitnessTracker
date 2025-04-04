// mealRoutes.js or mealsController.js

const express = require("express");
const router = express.Router();
const Meal = require("../models/Meals")
// POST route to add a new meal
router.post("/", async (req, res) => {
  const { name, category, calories, protein, carbs, fats, icon } = req.body;

  // 🛡️ Validation to avoid partial/incomplete entries
  if (!name || !calories || !category || !protein || !carbs || !fats) {
    return res.status(400).json({ message: "Missing meal data" });
  }
// Add this GET route below the POST route
router.get("/", async (req, res) => {
    try {
      const meals = await Meal.find().sort({ createdAt: -1 }); // optional: sorts meals by latest first
      res.status(200).json(meals);
    } catch (err) {
      res.status(500).json({ message: "Error fetching meals", error: err.message });
    }
  });
  
  try {
    const newMeal = new Meal({
      name,
      category,
      calories,
      protein,
      carbs,
      fats,
      icon,
      time: new Date().toLocaleTimeString(), // optional: if you’re setting time here
    });

    const savedMeal = await newMeal.save();
    res.status(201).json(savedMeal);
  } catch (err) {
    res.status(500).json({ message: "Error saving meal", error: err.message });
  }
});

module.exports = router;
