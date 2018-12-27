const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    items: {
        type: [String]
    },
    price: {
        type: Number
    },
    sale: {
        type: String,
        enum: ['WTB', 'WTS']
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = Transaction = mongoose.model("Transaction", TransactionSchema);