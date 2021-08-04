/**
 * @file CRUD API route for user authentication.
 */
const express = require("express");
const User = require("../models/users"); // Mongo Schema.
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")


const router = express.Router();
const TOKEN_EXPIRY = 60 * 60 * 24 * 30; // One month.


/**
 * Extract login credentials from http requests.
 * 
 * Modular function so we can change our method if we
 * start transmitting user credentials differently in the future.
 * 
 * @arg {http.request} req - http request
 */
function extractCredentials(req) {
    // Currently we transmit credentials via an authorization header:
    // "Basic user:password"
    let [type, credential] = req.headers.authorization.split(" ")
    let buff = Buffer.from(credential, "base64"); // Decode base64 header
    let [username, password] = buff.toString("ascii").split(":");
    return { username: username, password: password }
}


/**
 * Authenticate credentials from http requests.
 * 
 * @arg req - http request
 * @returns {boolean} bool
 */
async function authenticate(req) {
    try {
        let { username, password } = extractCredentials(req);
        let user = await User.findOne({ username: username });
        let authenticated = await bcrypt.compare(password, user.password);
        return authenticated
    } catch (err) {
        throw err
    }
}


// POST - create a new user
router.post("/", async (req, res) => {
    // We will create a new user/password, hashing sensitive data with bcrypt.
    // Upon successful creation, we will use a web token for future auth.
    try {
        let { username, password } = extractCredentials(req);

        // bcrypt creates 60-char long salted hash:
        // $[algo used]$[hashing cost]$[16-byte salt][24-byte hash]
        bcrypt.hash(password, 10, async (err, hash) => {
            try {
                if (err) {
                    console.log(err);
                }
                let user = new User();
                user.username = username;
                user.password = hash; // Hashed password.
                await user.save(); // Save new user to DB.
                res.json({
                    success: true,
                    msg: "User has been saved to the database",
                    token: jwt.sign({ username: user.username, exp: Math.floor(Date.now() / 1000) + TOKEN_EXPIRY }, process.env.SECRETKEY)
                })
                return
            } catch (err) {
                res.json({
                    success: false,
                    msg: "User has not been saved to the database"
                });
                throw err
            }
        })
        return
    } catch (err) {
        console.log(err);
    }

    // If our try/catch block passes without resolution.
    res.json({
        success: false,
        msg: "User has not been saved to the database"
    });
    return
})



// GET - authenticate a username/password combo.
router.get("/", async (req, res) => {
    try {
        let authenticated = await authenticate(req);
        if (authenticated) {
            let { username, password } = extractCredentials(req);
            let token = jwt.sign({ username: username, exp: Math.floor(Date.now() / 1000) + TOKEN_EXPIRY }, process.env.SECRETKEY);
            let user = await User.findOne({ username: username });

            if (user) {
                res.json({
                    success: true,
                    msg: "User authenticated",
                    token: token,
                })
            }
        } else {
            res.json({
                success: false,
                msg: "Invalid credentials, could not authenticate",
            })
        }
        return
    } catch (err) {
        console.log(err)
    }
    res.json({
        success: false,
        msg: "Could not authenticate for some reason"
    });
    return
})


// PUT - update password
// TODO - need to implement 
router.put("/", async (req, res) => {
    console.log("Put request to /users has not been implemented yet.")
    res.json({
        success: false,
        msg: "API route for PUT request to /users has not been implemented yet."
    })
});


// DELETE - delete credentials
router.delete("/", async (req, res) => {
    try {
        let authenticated = await authenticate(req);
        if (authenticated) {
            let { username, password } = extractCredentials(req);
            User.findOneAndDelete({ username: username }).exec();

            res.json({
                success: true,
                msg: "User deleted"
            });
        } else {
            res.json({
                success: false,
                msg: "User failed to authenticate with those credentials"
            });
        }
        return
    } catch (err) {
        console.log(err);
    }
    res.json({
        success: false,
        msg: "Something went wrong during user deletion"
    });
    return
})

module.exports = router;