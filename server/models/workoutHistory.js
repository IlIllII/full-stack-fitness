/** @file MongoDB schema for workout history. */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


/**
 * Workout Mongo schema.
 * 
 * @prop {string} username
 * @prop {Array} bench - workout session data
 * @prop {Array} press - workout session data
 * @prop {Array} squat - workout session data
 * @prop {Array} deadlift - workout session data
 * @prop {Array} row - workout session data
 * @prop {Array} pullups - workout session data
 * @prop {Number} benchFails - number of failures for lift
 * @prop {Number} pressFails - number of failures for lift
 * @prop {Number} squatFails - number of failures for lift
 * @prop {Number} deadliftFails - number of failures for lift
 * @prop {Number} rowFails - number of failures for lift
 * @prop {String} lastWorkout - most recent workout, A or B
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