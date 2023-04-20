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
const PlayerModel = require("./models/Players.js");
const LobbyModel = require("./models/Lobby.js");
const lobbyID = Math.floor(Math.random() * 99999) + 1;

// datamuse routes
const dictionaryUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";

// import objects
const Game = require("./objects/boggle_game.js");

const app = express();

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
    res.send(salty.toString())
})

app.get("/createlogin", (req, res) => {
    const salty = Math.floor(Math.random() * 9999) + 1;
    res.send(salty.toString())
})

app.post("/login", (req, res) => {
    const userName = req.body.userName
    const password = req.body.password
    // console.log("the pass: " + password)
    // console.log("username: " + userName)
    // console.log("salt: " + salty)
    
    if (password != '')
    {
        LogModel.findOne({ userName: userName })
            .then(user => {
                console.log(user);
                if (user) {
                    if (user.password === req.body.password) {
                        res.send("passGood");
                    }
                    else {
                        res.send("passBad");
                    }
                }

            })
        
    }
    else {
            LogModel.findOne({ userName: userName })
            .then(user => {
                console.log(user);
                if (user) {
                    if (user.userName === req.body.userName) {
                        res.send("userExists " + user.salt);
                        existSalt = user.salt;
                    }
                    else {
                        res.send("userTrue");
                    }
                }
                else {
                    res.send("userTrue");
                }
            })

    }
})

app.post("/createlogin", (req, res) => {
    const userName = req.body.userName
    const password = req.body.password
    // console.log("the pass: " + password)
    // console.log("username: " + userName)
    // console.log("salt: " + salty)
    
    if (password != '')
    {
        console.log(req.salt)
        postLogInfo(req);
        res.send('passGood');       
    }
    else {
            LogModel.findOne({ userName: userName })
            .then(user => {
                console.log(user);
                if (user) {
                    if (user.userName === req.body.userName) {
                        res.send("userExists");
                    }
                    else {
                        res.send("userTrue");
                    }
                }
                else {
                    res.send("userTrue");
                }
            })

    }
})


function postLogInfo(req) {
    LogModel.create(req.body)
    .then((someResponseObject) => {
        console.log({ someResponseObject});
    })
    .catch((err) => {
        console.log(err);
    });
    req.body.lobbyID = lobbyID;
    PlayerModel.create(req.body)
    .then((someResponseObject) => {
        console.log({ someResponseObject});
    })
    .catch((err) => {
        console.log(err);
    })
};
//#endregion
// game object
var game = new Game(4, 60);


// Create Player on database

app.post("/createPlayer", (req, res) => {
    req.body.lobbyID = lobbyID;
    game.add_player(userName);
    PlayerModel.create(req.body)
    .then((someResponseObject) => {
        console.log(JSON.stringify(someResponseObject));
    })
    .catch((err) => {
        console.log(err);
    })
})

app.post("/updatePlayer", (req, res) => {
    userName = req.body.userName
    game.add_player(userName);
    PlayerModel.findOneAndUpdate({userName: userName}, {lobbyID: lobbyID}, {new: true})
    .then((someResponseObject) => {
        console.log(JSON.stringify(someResponseObject));
    })
    .catch((err) => {
        console.log(err);
    })
})

//TODO create axios get call for lobby to retrieve players
app.get("/findPlayers", (req, res) => {
    PlayerModel.find({ lobbyID: lobbyID })
    .then((someResponseObject) => {
        console.log({ someResponseObject });
        res.json(someResponseObject);
      })
      .catch((err) => {
        res.status(404).json({message: "Error listing players", error: err.message});
      });
})


// start the server
app.listen(4000, () => {
    console.log("Server is running on port 4000");
});
