import React, { useState, useEffect } from 'react';

const Lobby = ({ playerID, lobbyID }) => {
  const [player, setPlayer] = useState(null);
  const [players, setPlayers] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (lobbyID) {
      const interval = setInterval(() => {
        fetchLobbyData();
      }, 1000); // Polling every 1 second
      return () => clearInterval(interval);
    }
  }, [lobbyID]);
  
  useEffect(() => {
    const storedPlayer = localStorage.getItem("player");
    if (storedPlayer) {
      setPlayer(JSON.parse(storedPlayer));
    }
  }, []);
  

  const fetchLobbyData = async () => {
    const response = await fetch(`/api/lobby/${lobbyID}`);
    const data = await response.json();
    setPlayers(data.players);
  };

  const handleReadyClick = async () => {
    setReady(!ready);
    const response = await fetch('http/localhost:4000/api/lobby/setReady', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ playerID, ready: !ready }),
    });
  };

  return (
    <div>
      <h1>Lobby {lobbyID}</h1>
      <ul>
        {players.map((player) => (
          <li key={player.id}>
            {player.username} - {player.ready ? 'Ready' : 'Not Ready'}
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
    </div>
  );
  
};

export default Lobby;
