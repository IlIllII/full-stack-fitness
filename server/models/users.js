/** @file MongoDB schema for users. */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;


/**
 * User Mongo schema.
 * 
 * @prop {String} username - Unique, required
 * @prop {String} password - required
 * 
 */
module.exports = mongoose.model("User", new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
}));