const express = require("express");
const mongoose = require("mongoose");
const routers = require("./routers/auth");
const dbURI = "mongodb://127.0.0.1:27017/userDB";

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection
    .once("open", () => console.log("Auth connection established"))
    .on("error", (err) => console.log(err))
    .on("disconnected", () => console.log("Auth connection disconnected"));

process.on("SIGINT", async () => {
    await mongoose.connection.close();
    process.exit(0);
});

const app = express();

app.get("/app", (req, res) => {
    res.status(200).sendFile(
        "E:/IWT/Assignment 1/startup-community/frontend/login.html"
    );
});

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use("/app", routers);
app.use("/startup-community/frontend", express.static(__dirname + "/frontend"));

app.listen(5000, () => {
    console.log("Server running at port 5000...");
});
