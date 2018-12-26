const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WarframeCountSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    warframe: {
        type: String,
        required: true
    },
    helmet: {
        type: Number
    },
    chassis: {
        type: Number
    },
    systems: {
        type: Number
    },
    blueprint: {
        type: Number
    }
});

module.exports = WarframeCount = mongoose.model("WarframeCount", WarframeCountSchema);