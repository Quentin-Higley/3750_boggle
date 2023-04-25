const mongoose = require("mongoose")

const GameSchema = new mongoose.Schema({
    gameID: {
        type: String,
        required: true
    },

    gameObject:{
        type: String,
        required: true
    }


});

const AppHangman = mongoose.model("logInfo", LogSchema);
module.exports = AppHangman