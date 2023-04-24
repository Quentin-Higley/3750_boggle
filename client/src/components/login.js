import { useState, useEffect } from 'react';
import axios from 'axios'; // Communications
import { useNavigate } from "react-router-dom";

import createHash from 'crypto-js';


function Login() {
    
    const [logInfo, setLogInfo] = useState({userName: "", password: "", salt: ""});

    window.onload = (() => {
        document.getElementById("password").style.display = "none";
        document.getElementById("passwordlbl").style.display = "none";
        document.getElementById("enterPassword").style.display = "none";
        document.getElementById("loglbl").innerHTML = "Enter Username";
        
    })

    const navigate = useNavigate();

    useEffect(() => {
        const loggedIn = localStorage.getItem("loggedIn");
        console.log("In useEffect, localStorage loggedIn is: " + loggedIn);
        if (loggedIn === "true") {
            console.log("logged in redirecting");
            navigate('/hangman', {replace: true});
        }
    })

    
    function hash(string) {
        const hash = createHash.SHA256(string).toString();
        return hash;
    }

    function handleChange(e) { // Collects values from the dom
        setLogInfo({ ...logInfo, [e.target.name]:e.target.value }); // "..." breaks object into key/value
    }

    function handleSubmit(e) { // Sends the data 
        e.preventDefault();
        let localUser = document.getElementById("username").value;
        
        logInfo.userName = localUser;
        axios.post("http://localhost:4000/login", logInfo)
        .then((res) => {
            console.log("The response is: " + res.data);
            let databoi = res.data;
            let responseboi = databoi.split(" ")
            console.log(responseboi)
            if(res.data == "userTrue")
            {
                document.getElementById("loglbl").innerHTML = "User Does not exist. Please enter different username or create new user.";
            }
            else if(responseboi[0] == "userExists")
            {
                logInfo.salt = responseboi[1];
                document.getElementById("loglbl").innerHTML = "Enter Password";
                document.getElementById("password").style.display = "block";
                document.getElementById("passwordlbl").style.display = "block";
                document.getElementById("enterPassword").style.display = "block";
                document.getElementById("enterUsername").style.display = "none";
                document.getElementById("loglbl").innerHTML = "Enter Password";
                document.getElementById("username").disabled = true;
            }

        }
        )
        .catch((err) => {
            console.log("Error, couldn't login")
            console.log(err.message);
        })
    }


    function newUser(e) {
        e.preventDefault();
        location.href = '/createlogin';
    }
    
    function handlePass(e) {
        e.preventDefault();
        let localPass = document.getElementById("password").value;
        
        localPass = localPass + logInfo.salt;
        localPass = hash(localPass);
        logInfo.password = localPass;
        logInfo.userName = document.getElementById("username").value;
        console.log(localPass)
        axios.post("http://localhost:4000/login", logInfo)
        .then((res) => {
            console.log("The response is: " + res.data);

            if (res.data == "passGood") {
                axios.post("http://localhost:4000/api/createPlayer", { username: logInfo.userName })
                  .then((playerRes) => {
                    localStorage.setItem("loggedIn", res.data.loggedIn);
                    localStorage.setItem("userName", logInfo.userName);
                    localStorage.setItem("player", JSON.stringify(playerRes.data)); // Store the player object
                    location.href = '/lobby'; // waiting room
                  })
                  .catch((err) => {
                    console.log("Error, couldn't create a player object");
                    console.log(err.message);
                  });
              }
              

        }
        )
        .catch((err) => {
            console.log("Error, couldn't login")
            console.log(err.message);
        })
        axios.post("http://localhost:4000/createPlayer", logInfo)
    }

    return ( //The html for the page
    <div class="container shadow-lg p-3 mb-5 bg-body-tertiary rounded">
            <form class="myForm">
                <div class="row">
                    <div class="col">
                        <h4 id="loglbl"></h4>
                    </div>
                    <div class="col">
                        <button class="btn btn-primary" onClick={newUser}>Create New User</button>
                    </div>
                </div>
                
                <br/>
                <div class="row">
                    <label id="userNamelbl">UserName:</label>
                    <input type="text" name="username" id="username" class="w-25" onChange={handleChange}></input>
                </div>
                
                <div class="row">
                    <label id="passwordlbl">Password:</label>
                    <input type="password" name="personName" id="password" class="w-25" onChange={handleChange}></input>
                </div>
                
                <div class="row m-3">
                    <div class="col">
                        <button class="btn btn-primary" id='enterUsername' onClick={handleSubmit}type='submit'>Submit Username</button>
                    </div>
                    <div class="col">
                        <button class="btn btn-primary" id='enterPassword' onClick={handlePass}>Submit Password</button>
                    </div>
                </div>
                
            </form>

        </div>
    );

}

export default Login
