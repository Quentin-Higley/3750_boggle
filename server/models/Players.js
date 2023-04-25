const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ready: { type: Boolean, default: false },
  gameID: {type: String, default: true },
});

module.exports = mongoose.model('Player', PlayerSchema);
