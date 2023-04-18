const mongoose = require('mongoose');

const LobbySchema = new mongoose.Schema({
  lobbyID: { type: Number, required: true },
  gameStarted: { type: Boolean, default: false },
});

module.exports = mongoose.model('Lobby', LobbySchema);
