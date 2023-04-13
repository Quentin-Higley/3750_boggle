import { useState, useEffect } from 'react';
import axios from 'axios'; // Communications
import { useNavigate } from "react-router-dom";

import createHash from 'crypto-js';

function CreateLogin() {

    const [logInfo, setLogInfo] = useState({userName: "", password: "", salt: ""});
    
    window.onload = (() => {
        axios.get("http://localhost:4000/createlogin")
        .then((res) => {
            logInfo.salt = res.data     
        })

        document.getElementById("password").style.display = "none";
        document.getElementById("passwordlbl").style.display = "none";
        document.getElementById("enterPassword").style.display = "none";
        document.getElementById("loglbl").innerHTML = "Create Username";
        
    })

    const navigate = useNavigate();

    useEffect(() => {
        const loggedIn = localStorage.getItem("loggedIn");
        console.log("In useEffect, localStorage loggedIn is: " + loggedIn);
        if (loggedIn === "true") {
            console.log("logged in redirecting");
            navigate('', {replace: true});
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
        axios.post("http://localhost:4000/createlogin", logInfo)
        .then((res) => {
            console.log("The response is: " + res.data);
            
            if(res.data == "userTrue")
            {
                document.getElementById("loglbl").innerHTML = "Enter Password";
                document.getElementById("password").style.display = "block";
                document.getElementById("passwordlbl").style.display = "block";
                document.getElementById("enterPassword").style.display = "block";
                document.getElementById("enterUsername").style.display = "none";
                document.getElementById("loglbl").innerHTML = "Enter Password";
                document.getElementById("username").disabled = true;
            }
            else if(res.data == "userExists")
            {
                document.getElementById("loglbl").innerHTML = "Username is taken. Please choose new username.";
            }

        }
        )
        .catch((err) => {
            console.log("Error, couldn't login")
            console.log(err.message);
        })
    }

    
    function handlePass(e) {
        e.preventDefault();
        let localPass = document.getElementById("password").value;
        
        localPass = localPass + logInfo.salt;
        localPass = hash(localPass);
        logInfo.password = localPass;
        logInfo.userName = document.getElementById("username").value;
        console.log(logInfo.userName)
        axios.post("http://localhost:4000/createlogin", logInfo)
        .then((res) => {
            console.log("The response is: " + res.data);

            if(res.data == "passGood")
            {
                location.href = ''//waiting room
                localStorage.setItem("loggedIn", res.data.loggedIn);
            }
        }
        )
        .catch((err) => {
            console.log("Error, couldn't login")
            console.log(err.message);
        })
    }

    return ( //The html for the page
    <div class="container">
            <form class="myForm">
                <h4 id="loglbl"></h4>
                <br/>
                <div class="row">
                    <label id="userNamelbl">UserName:</label>
                    <input type="text" name="username" id="username" onChange={handleChange}></input>
                </div>
                
                <div class="row">
                    <label id="passwordlbl">Password:</label>
                    <input type="text" name="personName" id="password" onChange={handleChange}></input>
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

export default CreateLogin