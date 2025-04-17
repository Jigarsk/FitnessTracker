const express = require("express");
const router = express.Router();
const Meal = require("../models/Meals");

// POST route to add a new meal
router.post("/", async (req, res) => {
  const { name, category, calories, protein, carbs, fats, icon } = req.body;

  if (!name || !calories || !category || !protein || !carbs || !fats) {
    return res.status(400).json({ message: "Missing meal data" });
  }

  try {
    const newMeal = new Meal({
      name,
      category,
      calories,
      protein,
      carbs,
      fats,
      icon,
      time: new Date().toLocaleTimeString(),
    });

    const savedMeal = await newMeal.save();
    res.status(201).json(savedMeal);
  } catch (err) {
    res.status(500).json({ message: "Error saving meal", error: err.message });
  }
});

// GET route to fetch all meals
router.get("/", async (req, res) => {
  try {
    const meals = await Meal.find().sort({ createdAt: -1 });
    res.status(200).json(meals);
  } catch (err) {
    res.status(500).json({ message: "Error fetching meals", error: err.message });
  }
});

// DELETE route to remove a meal
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMeal = await Meal.findByIdAndDelete(id);

    if (!deletedMeal) {
      return res.status(404).json({ message: "Meal not found" });
    }

    res.status(200).json({ message: "Meal deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting meal", error: err.message });
  }
});

module.exports = router;
