const mongoose = require('mongoose');

const LobbySchema = new mongoose.Schema({
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
  gameStarted: { type: Boolean, default: false },
});

module.exports = mongoose.model('Lobby', LobbySchema);
