const express = require('express');

const Workout = require('../models/Workouts');

const router = express.Router();

// Route to add a new workout
router.post('/', async (req, res) => {
    console.log(req.body);  // Log the received data

  const { type, duration, calories, time } = req.body;

  try {
    const newWorkout = new Workout({
      type,
      duration,
      calories,
      time,
    });

    await newWorkout.save();
    res.status(201).json(newWorkout);
  } catch (error) {
    res.status(500).json({ message: 'Error saving workout', error: error.message });
  }
});

// Route to get all workouts
router.get('/', async (req, res) => {
    try {
      const workouts = await Workout.find();
      res.status(200).json(workouts.map(workout => ({
        ...workout.toObject(),
        id: workout._id.toString() // Convert ObjectId to string
      })));
    } catch (error) {
      res.status(500).json({ message: 'Error fetching workouts', error: error.message });
    }
  });
  
router.delete('/:id', async (req, res) => {
    try {
      const workout = await Workout.findByIdAndDelete(req.params.id);  // Assuming `Workout` is the model
      if (!workout) {
        return res.status(404).json({ message: 'Workout not found' });
      }
      res.status(200).json({ message: 'Workout deleted successfully' });
    } catch (error) {
      console.error('Error deleting workout:', error);
      res.status(500).json({ message: 'Error deleting workout', error: error.message });
    }
  });

module.exports = router;
