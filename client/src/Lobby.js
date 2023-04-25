import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Communications

const Lobby = ({ playerID, lobbyID }) => {
  const [players, setPlayers] = useState([]);
  const [ready, setReady] = useState(false);
  const [items, setItems] = useState([]);

    useEffect(() => {
            axios.get("http://localhost:4000/findPlayers")
            .then((JSON) => {
                console.log(JSON)
                setItems(JSON.data);
                console.log(items)
            })
            .catch((err) => {
                console.log(err.message);
            });
        },
        []
    );

    setInterval(function () {axios.get("http://localhost:4000/findPlayers")
      .then((JSON) => {
        setItems(JSON.data);
      })}, 500);

  const handleReadyClick = async () => {
    setReady(!ready);
    const response = await fetch('/api/lobby/setReady', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ playerID, ready: !ready }),
    });
  };

 function handleReady(e) {
    e.preventDefault();
    axios.post('http://localhost:4000/readyUp', e.target.userName)
    .then((res) => {
        console.log(res.data);
    })
 }

  return (
    <div>
      <h1>Lobby {lobbyID}</h1>
      <ul>
        {items.map((player, i) => (
          <li key={i}>
            {player.userName} - {JSON.stringify(player.ready)}
            {player.userName == localStorage.getItem("userName") ? <button>Ready</button> : <p></p>}
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Lobby;
