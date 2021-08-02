/** @file MongoDB schema for workout history. */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;


/**
 * User schema containing username and password properties.
 * 
 * @arg {string} username
 * @arg {string} password - required
 * 
 */
module.exports = mongoose.model("WorkoutHistory", new Schema({
    username: String,
    bench: Array,
    press: Array,
    squat: Array,
    deadlift: Array,
    row: Array,
    pullups: Array,
    benchFails: Number,
    pressFails: Number,
    squatFails: Number,
    deadliftFails: Number,
    rowFails: Number,
    lastWorkout: String,
}));