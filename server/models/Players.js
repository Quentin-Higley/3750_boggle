const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  ready: { type: Boolean, default: false },
  lobbyID: {type: Number, required: true}
});

//module.exports = mongoose.model('Player', PlayerSchema);

const AppPlayer = mongoose.model("playerInfo", PlayerSchema);
module.exports = AppPlayer
