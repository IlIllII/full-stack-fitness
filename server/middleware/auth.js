/**
 * @file Middleware for token authentication.
 */
const express = require("express");
const User = require("../models/users");
const jwt = require("jsonwebtoken")


// Debugging notification.
function redirect(res) {
    console.log("User should be redirected to login d/t missing token.")
}


module.exports = () => {
    // Middleware function
    return (req, res, next) => {
        if (req.url == "/users") {
            next()
            return
        } else {
            try {
                if (type == "Bearer") {
                    let decoded = jwt.verify(token, process.env.SECRETKEY); // Throws err if fails.
                    let [type, token] = req.headers.authorization.split(" ");
                    next();
                    return
                }
            } catch (err) {
                console.log(err);
                redirect(res)

                // We send back 401 and client handles the redirect.
                res.status(401).json({
                    success: false,
                    msg: "Token did not authenticate",
                });
                res.send();
                res.end();
                return
            }
        }
        redirect(res)
        res.end();
        return
    }
}