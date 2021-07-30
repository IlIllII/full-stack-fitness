const express = require("express");
const User = require("../models/users");
const jwt = require("jsonwebtoken")


function redirect(res) {
    console.log("User should be redirected to login d/t missing token.")
}


module.exports = () => {
    return (req, res, next) => {
        console.log(req.url);

        if (req.url == "/login") {
            redirect(res)
            res.end();
            return
        } else if (req.url == "/users") {
            next()
            return
        } else {
            try {
                let [type, value] = req.headers.authorization.split(" ");
                if (type == "Bearer") {
                    let decoded = jwt.verify(token, process.env.SECRETKEY);
                    console.log("Token recieved, decoding...")
                    console.log(decoded);
                    next();
                    return
                }
            } catch(err) {
                console.log(err);
                redirect(res)
                res.end();
                return
            }
        }
        redirect(res)
        res.end();
        return
    }
}