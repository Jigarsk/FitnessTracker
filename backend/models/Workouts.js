const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    id:{
        type: Number,
    
    },
  type: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
