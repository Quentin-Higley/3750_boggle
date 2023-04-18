const mongoose = require("mongoose")

const LogSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true,
    }

});

const AppHangman = mongoose.model("logInfo", LogSchema);
module.exports = AppHangman