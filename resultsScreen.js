import {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Lobby from './lobby.js';
import { Link } from 'react-router-dom';

//the goal is to use the save local storage variables through sessions
// the cookies to display the winner and everyones points.

//At the end of the game, each player should see a results screen.  
//The screen lists for each player all words correctly found, as well as that player's total score.  
//The winner is displayed.  Players can choose to start a new game if desired.

//get item from local storage = const loggedin = localStorage.getItem("loggedIn")
//set item in local storage = localStorage.setItem("username", "");

function ResultScreen(){
    const [winner, setWinner] = useState("");
    const username = localStorage.getItem("username");
    

    //will either need to pull from the server the last game state.
    // or use local storage to retrieve the items.


    //we will need to create a function to see if they are the winner.
    function checkifWinner(){
        if(username == "winners username Retrieved from server"){
            setWinner("Congrats you are the Winner!!");
        }


        
    }

   
    

   
    return(
        
        
        <div className='center background' >
            <div>
                <h1>Results </h1>
                <br/>
                <p>{winner}</p>
                
            
            </div>
            {/* This is where I need to list the Players, score, words */}


            <Link to = "lobby">
                <button type='button' className='button_rtlobby'>Return To Lobby</button>
            </Link>
        </div>
    );
}

export default ResultScreen;