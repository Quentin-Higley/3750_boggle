import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Lobby = ({ playerID, lobbyID }) => {
  const [player, setPlayer] = useState(null);
// Lobby component
const Lobby = (props) => {
  // State variables
  const [players, setPlayers] = useState([]);
  const [ready, setReady] = useState(false);
  const [startMessage, setStartMessage] = useState("");
  const [allPlayersReady, setAllPlayersReady] = useState(false);

  // Get the location object and extract loggedInUsername
  const location = useLocation();
  const { username: loggedInUsername } = location.state;
  const { playerID, lobbyID } = props;

  // Navigation hook
  const navigate = useNavigate()

  // Poll for lobby data
  useEffect(() => {
    if (lobbyID) {
      const interval = setInterval(() => {
        fetchLobbyData();
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [lobbyID]);
  
  useEffect(() => {
    const storedPlayer = localStorage.getItem("player");
    if (storedPlayer) {
      setPlayer(JSON.parse(storedPlayer));
    }
  }, []);
  

  // Fetch lobby data from the server
  const fetchLobbyData = async () => {
    const response = await fetch(`/api/lobby/${lobbyID}`);
    const data = await response.json();
    setPlayers(data.players);
  
    // Log the ready/unready status of players
    console.log("Players' ready/unready status:");
    data.players.forEach((player) => {
      console.log(`${player.username}: ${player.ready ? 'Ready' : 'Not Ready'}`);
    });
  };
  

  // Update allPlayersReady state based on the ready state of all players
  useEffect(() => {
    if (players.length > 1 && players.every((player) => player.ready)) {
      setAllPlayersReady(true);
    } else {
      setAllPlayersReady(false);
    }
  }, [players]);

  // Handle the click event for the Ready button
  const handleReadyClick = async () => {
    setReady(!ready);
  
    // Log the player's ready/unready status
    console.log(`Player ${player.username} is ${!ready ? 'ready' : 'unready'}`);
  
    const response = await fetch('http://localhost:4000/api/setReady', {
      method: 'POST',
    const newReadyStatus = !ready;
    setReady(newReadyStatus);
    const response = await fetch("/api/lobby/setReady", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ playerID, ready: newReadyStatus }),
    });

    if (newReadyStatus) {
      setTimeout(() => {
        if (allPlayersReady) {
          setStartMessage("Starting Game...");
          setTimeout(() => {
            navigate("/game");
          }, 2000);
        }
      }, 3000);
    }
  };
  
  

  // Filter out the current user from the list of players
  const otherPlayers = players.filter(player => player.username !== loggedInUsername);

  // Render the component
  return (
    <div>
      <h1>Lobby {lobbyID}</h1>
      <h2>Logged in as: {loggedInUsername}</h2>
      <h3>Other Players</h3>
      <ul>
        {otherPlayers.map((player) => (
          <li key={player.id}>
            {player.username} - {player.ready ? "Ready" : "Not Ready"}
          </li>
        ))}
      </ul>
      {player && (
        <div>
          <h2>Your player info:</h2>
          <p>Username: {player.username}</p>
        </div>
      )}
      <button onClick={handleReadyClick}>{ready ? 'Unready' : 'Ready'}</button>
      <button onClick={handleReadyClick}>{ready ? "Unready" : "Ready"}</button>
      {startMessage && <h3>{startMessage}</h3>
      }
    </div>
  );
  
};

export default Lobby;
