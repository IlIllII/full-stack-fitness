const express = require("express");
const WorkoutHistory = require("../models/workoutHistory")


const router = express.Router();


router.post("/", async (req, res) => {
    console.log("body recieved:")
    console.log(req.body);
    try {
        let hx = new WorkoutHistory();
        hx.username = req.body.username;
        hx.bench = req.body.bench;
        hx.press = req.body.press;
        hx.squat = req.body.squat;
        hx.deadlift = req.body.deadlift;
        hx.row = req.body.row;
        hx.pullups = req.body.pullups;
        hx.benchFails = req.body.benchFails;
        hx.pressFails = req.body.pressFails;
        hx.squatFails = req.body.squatFails;
        hx.deadliftFails = req.body.deadliftFails;
        hx.rowFails = req.body.rowFails;
        hx.lastWorkout = req.body.lastWorkout;

        await hx.save();
        res.json({
            success: true,
            msg: "New workout history saved successfully."
        })
    } catch(err) {
        console.log(err);
        res.status(500).json({
            success: false,
            msg: err.message
        })
    }
});

router.get("/:id", async (req, res) => {
    try {
        let hx = await WorkoutHistory.findOne({username: req.params.id})
        res.json({
            success: true,
            msg: "Retrieved workout history successfully",
            workoutHistory: hx,
        })
    } catch(err) {
        console.log(err);
        res.status(500).json({
            success: false,
            msg: err.message
        })
    }
})

router.put("/:id", async (req, res) => {
    try {
        let hx = await WorkoutHistory.findOneAndUpdate({username: req.params.id}, {
            $set: {
                username: req.body.username,
                bench: req.body.bench,
                press: req.body.press,
                squat: req.body.squat,
                deadlift: req.body.deadlift,
                row: req.body.row,
                pullups: req.body.pullups,
                benchFails: req.body.benchFails,
                pressFails: req.body.pressFails,
                squatFails: req.body.squatFails,
                deadliftFails: req.body.deadliftFails,
                rowFails: req.body.rowFails,
                lastWorkout: req.body.lastWorkout,
            }
        }, {upsert: true});

        console.log(hx);

        res.json({
            success: true,
            msg: "Workout updated successfully",
            workoutHistory: hx
        })

    } catch(err) {
        console.log(err);
        res.status(500).json({
            success: false,
            msg: err.message
        })
    }
})

router.delete("/:id", async (req, res) => {
    try {
        let hx = await WorkoutHistory.findOneAndDelete({username: req.params.id})

        if (hx) {
            res.json({
                success: true,
                msg: "Workout history deleted successfully"
            })
        }
    } catch(err) {
        res.status(500).json({
            success: false,
            msg: err.message
        })
    }
})


module.exports = router;