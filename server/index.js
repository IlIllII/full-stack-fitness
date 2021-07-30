/*
This file contains the main express server logic for the project. It will handle
API requests for the app and interface with the database.
*/
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");


// Load .env variables into process environment.
dotenv.config();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB.
mongoose.connect(process.env.DATABASE, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    // Simple console logging.
    console.log("Connecting to database...")
    if (err) {
        // Color codes can be found at:
        // https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
        console.log("\x1b[31m%s\x1b[0m", "Something went wrong when connecting to the database:")
        console.log(err)
    } else {
        console.log("\x1b[32m%s\x1b[0m", "Successfully connected to database.")
    }
});


// Initialize express app.
const app = express();


// Load in middleware
app.use(express.json()); // Enable JSON requests and responses.
app.use(express.urlencoded({extended: true}));
app.use(morgan());
app.use(cors());
app.use(require("./middleware/auth")()); // token authentication


// CRUD API router middleware
app.use("/users", require("./routes/users")); // User login


// Listen on a port.
app.listen(PORT, (err) => {
    // Simple console logging.
    console.log("Starting server...")
    if (err) {
        console.log("\x1b[31m%s\x1b[0m", "Something went wrong when starting the server:");
        console.log(err);
    } else {
        console.log("\x1b[32m%s\x1b[0m", `Listening on port: ${PORT}`);
    }
})