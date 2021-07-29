const express = require("express");
const User = require("../models/users");
const bcrypt = require("bcrypt");



const router = express.Router();


/**
 * Extract login credentials from http requests.
 * 
 * Wrote as a modular function so we can change our method if we
 * start transmitting user credentials differently in the future.
 * 
 * @arg {http.request} req - http request
 */
function extractCredentials(req) {
    // Currently we transmit credentials via an authorization header:
    // "Basic user:password"
    let [username, password] = req.headers.authorization.split(" ")[1].split(":");
    return {username: username, password: password}
}


/**
 * Authenticate credentials from http requests.
 * 
 * @arg req - http request
 * @returns {boolean}
 */
async function authenticate(req) {
    try {
        let {username, password} = extractCredentials(req);
        let user = await User.findOne({username: username}); // Query db.
        let authenticated = await bcrypt.compare(password, user.password);
        return authenticated
    } catch (err) {
        throw err
    }
}


// POST - create a new user
router.post("/users", async (req, res) => {
    /*
    We want to create new user credentials from http request
    and then save those credentials in our database.
    */
    try {
        // Parsing request for credentials.
        let {username, password} = extractCredentials(req);
        
        // bcrypt creates 60-char long salted hash:
        // $[algo used]$[hashing cost]$[16-byte salt][24-byte hash]
        bcrypt.hash(password, 10, async (err, hash) => {
            try {
                let user = new User();
                user.username = username;
                user.password = hash;
                await user.save(); // Save new user to the database.
                res.json({ // Send back success message and exit function.
                    success: true,
                    msg: "User has been saved to the database"
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
router.get("/users", async (req, res) => {
    /*
    The GET method authenticates users.
    For further details, see the POST method documentation above.
    */
    try {
        let authenticated = await authenticate(req);
        if (authenticated) {
            res.json({
                success: true,
                msg: "User successfully authenticated"
            });
        } else {
            res.json({
                success: false,
                msg: "Invalid credentials, could not authenticate"
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
router.put("/users", async (req, res) => {
    console.log("Put request to /users has not been implemented yet.")
    res.json({
        success: false,
        msg: "API route for PUT request to /users has not been implemented yet."
    })
});


// DELETE - delete credentials
router.delete("/users", async (req, res) => {
    try {
        let authenticated = await authenticate(req);
        if (authenticated) {
            let {username, password} = extractCredentials(req);
            User.findOneAndDelete({username: username}).exec();

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