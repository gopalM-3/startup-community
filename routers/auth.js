const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const Form = require("../models/formSchema");
const QA = require("../models/q&aSchema");

router.get("/users", async (req, res) => {
    try {
        const user = await User.find();
        res.status(200).json(user);
    } catch (err) {
        res.send("Error");
        console.log(err);
    }
});

router.get("/applicants", async (req, res) => {
    try {
        const form = await Form.find();
        res.status(200).json(form);
    } catch (err) {
        res.send("Error");
        console.log(err);
    }
});

router.get("/qa", async (req, res) => {
    try {
        const qa = await QA.find();
        res.status(200).json(qa);
    } catch (err) {
        res.send("Error");
        console.log(err);
    }
});

router.get("/signup", async (req, res) => {
    res.status(200).sendFile(
        "E:/Web dev/startup-community/frontend/signup.html"
    );
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
            res.status(200).sendFile(
                "E:/Web dev/startup-community/frontend/home.html"
            );
        } catch (err) {
            console.log(err);
        }
    } else {
        res.status(200).send("Passwords do not match");
    }
});

router.get("/login", async (req, res) => {
    res.status(200).sendFile(
        "E:/Web dev/startup-community/frontend/login.html"
    );
    console.log("User hit the login page");
});

router.post("/login", async (req, res) => {
    try {
        await User.findOne({username: req.body.username}, (error, data) => {
            if (error) {
                console.log(error);
            }
            if (req.body.password === data.password) {
                res.status(200).sendFile(
                    "E:/Web dev/startup-community/frontend/home.html"
                );
            } else {
                res.status(200).send("Incorrect credentials");
            }
        }).clone();
    } catch (err) {
        console.log(err);
    }
});

router.post("/submitForm", async (req, res) => {
    const form = new Form({
        name: req.body.name,
        email: req.body.email,
        newsLetter: req.body.nl,
    });
    console.log(
        `Name: ${form.name}, Email: ${form.email}, Newsletter: ${form.newsLetter}`
    );

    try {
        await form.save();
        res.status(200).send(
            "Form submitted, your application will be processed!"
        );
    } catch (err) {
        console.log(err);
    }
});

router.post("/submitQA", async (req, res) => {
    const qa = new QA({
        question: req.body.question,
        email: req.body.qemail,
        details: req.body.details,
    });
    console.log(
        `Question: ${qa.question}, Email: ${qa.email}, Details: ${qa.details}`
    );

    try {
        await qa.save();
        res.status(200).send("Query submitted, we'll reach out to you soon!");
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
