// requirements
const express = require("express");
var session = require("express-session");
var MongoDBStore = require("connect-mongodb-session")(session);
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const configureDatabase = require("./db/db.js");

// import objects
const Game = require("./objects/boggle_game.js");

const app = express();

app.use(
    cors({
        origin: "http://localhost:3000/",
        credentials: true,
    })
);
app.use(bodyParser.json());

var store = new MongoDBStore({
    uri: "mongodb+srv://QuentinHigley:iqeNLaKLjpOLKpzh@cluster0.vcxpdkn.mongodb.net/?retryWrites=true&w=majority",
    databaseName: "sessions",
    collection: "boggleSessions",
});

store.on("error", (error) => {
    console.log("Error connecting to session store");
    console.log(error);
});

app.use(
    session({
        secret: "keyboard cat",
        cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
        store: store,
        resave: true,
        saveUninitialized: true,
    })
);

configureDatabase();

// game object
var game = new Game(4, 180);

// start the server
app.listen(4000, () => {
    console.log("Server is running on port 4000");
});
