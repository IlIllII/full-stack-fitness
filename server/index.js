/**
 * @file This file contains the main express server logic for the project.
 * It will handle API requests for the app and interface with the database.
 */
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");


dotenv.config();
const PORT = process.env.PORT || 3000;


mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
}, (err) => {
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


const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());
app.use(require("./middleware/auth")()); // Token authentication.


// CRUD API middleware.
app.use("/users", require("./routes/users")); // User login.
app.use("/workout", require("./routes/workoutHistory")); // Workout data.
app.use(express.static("public"))


app.listen(PORT, (err) => {
    console.log("Starting server...")
    if (err) {
        console.log("\x1b[31m%s\x1b[0m", "Something went wrong when starting the server:");
        console.log(err);
    } else {
        console.log("\x1b[32m%s\x1b[0m", `Listening on port: ${PORT}`);
    }
})