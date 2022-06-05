const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");

router.get("/users", async (req, res) => {
    try {
        const user = await User.find();
        res.status(200).json(user);
    } catch (err) {
        res.send("Error");
        console.log(err);
    }
});

router.get("/signup", async (req, res) => {
    res.status(200).send("Signup page");
    console.log("User hit the signup page");
});

router.post("/signup", async (req, res) => {
    if (req.body.password === req.body.confPassword) {
        const user = new User({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        console.log(`Username: ${user.name}, Password: ${user.password}`);

        try {
            await user.save();
            res.status(200).send("Signup succesful!");
        } catch (err) {
            console.log(err);
        }
    } else {
        res.status(200).send("Passwords do not match");
    }
});

router.get("/login", async (req, res) => {
    res.status(200).send("Login page");
    console.log("User hit the login page");
});

router.post("/login", async (req, res) => {
    try {
        await User.findOne({username: req.body.username}, (error, data) => {
            if (error) {
                console.log(error);
            }
            if (req.body.password === data.password) {
                res.status(200).send("Successfully logged in!");
            } else {
                res.status(200).send("Incorrect credentials");
            }
        }).clone();
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
