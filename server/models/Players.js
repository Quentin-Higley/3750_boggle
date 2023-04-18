const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ready: { type: Boolean, default: false },
});

module.exports = mongoose.model('Player', PlayerSchema);
