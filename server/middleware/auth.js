const express = require("express");
const User = require("../models/users");
const jwt = require("jsonwebtoken")




module.exports = () => {
    return (req, res, next) => {
        console.log(req.url);

        if (req.url == "/login") {
            res.sendFile(__dirname + "/views/login.html")
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
                res.status(401).sendFile(__dirname + "/views/login.html")
                res.end();
                return
            }
        }
        res.status(401).sendFile(__dirname + "/views/login.html");
        res.end();
        return
    }
}