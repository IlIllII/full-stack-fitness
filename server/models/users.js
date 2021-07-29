/** @file MongoDB schema for users. */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;


/**
 * User schema containing username and password properties.
 * 
 * @arg {string} username
 * @arg {string} password - required
 * 
 */
module.exports = mongoose.model("User", new Schema({
    username: {type: String, unique: true, require: true},
    password: {type: String, require: true},
}));