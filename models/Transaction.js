const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    name: {
        type: String
    },
    item: {
        type: String
    },
    price: {
        type: Number
    },
    date: {
        type: Date
    }
});

module.exports = Transaction = mongoose.model("Transaction", TransactionSchema);