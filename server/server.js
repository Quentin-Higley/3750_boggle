// requirements
const express = require("express");
var session = require("express-session");
var MongoDBStore = require("connect-mongodb-session")(session);
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const configureDatabase = require("./db/db.js");
const LogModel = require("./models/loginModel.js");
const Player = require('./objects/boggle_player');

// datamuse routes
const dictionaryUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";

// import objects
const Game = require("./objects/boggle_game.js");

const app = express();

// set up game
boggleGame = new Game(4, 60);

app.use(
    cors({
        origin: "http://localhost:3000",
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

//#region Login logic
app.get("/login", (req, res) => {
    const salty = Math.floor(Math.random() * 9999) + 1;
    res.send(salty.toString());
});

app.get("/createlogin", (req, res) => {
    const salty = Math.floor(Math.random() * 9999) + 1;
    res.send(salty.toString());
});

app.post("/login", (req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;
    // console.log("the pass: " + password)
    // console.log("username: " + userName)
    // console.log("salt: " + salty)

    if (password != "") {
        LogModel.findOne({ userName: userName }).then((user) => {
            console.log(user);
            if (user) {
                if (user.password === req.body.password) {
                    res.send("passGood");
                } else {
                    res.send("passBad");
                }
            }
        });
    } else {
        LogModel.findOne({ userName: userName }).then((user) => {
            console.log(user);
            if (user) {
                if (user.userName === req.body.userName) {
                    res.send("userExists " + user.salt);
                    existSalt = user.salt;
                } else {
                    res.send("userTrue");
                }
            } else {
                res.send("userTrue");
            }
        });
    }
});

app.post("/createlogin", (req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;
    // console.log("the pass: " + password)
    // console.log("username: " + userName)
    // console.log("salt: " + salty)

    if (password != "") {
        console.log(req.salt);
        postLogInfo(req);
        res.send("passGood");
    } else {
        LogModel.findOne({ userName: userName }).then((user) => {
            console.log(user);
            if (user) {
                if (user.userName === req.body.userName) {
                    res.send("userExists");
                } else {
                    res.send("userTrue");
                }
            } else {
                res.send("userTrue");
            }
        });
    }
});

//Creating Player based off username
app.post('/api/createPlayer', (req, res) => {
    const username = req.body.username;
    const player = new Player(username);
    res.json(player);
  });

  //Updating Player Ready Status
  app.post('/api/setReady', (req, res) => {
    const { playerID, ready } = req.body;
  
    // Update the ready status of the player in your server data (e.g., in-memory storage, database, etc.)
  
    res.json({ message: 'Player ready status updated' });
  });
app.post("/checkword", (req, res) => {
    const word = req.body.word;
    const url = dictionaryUrl + word;
    const player = req.body.player;
    // check if word is on the board
    if (boggleGame.submit_word(word)) {
        // check if word is in the dictionary
        fetch(url)
            .then((response) => {
                if (response.word == word) {
                    player.score_word(player, word);
                    res.send("good");
                } else {
                    res.send("bad");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    } else {
        res.send("bad");
    }
});

function postLogInfo(req) {
    LogModel.create(req.body)
        .then((someResponseObject) => {
            console.log({ someResponseObject });
        })
        .catch((err) => {
            console.log(err);
        });
}

// game object
var game = new Game(4, 60);

// start the server
app.listen(4000, () => {
    console.log("Server is running on port 4000");
});
