const express = require('express');
const passport = require('passport');

const Router = express.Router();

const validateTransactionInput = require('../../validation/salelog');
const parseTransactionItems = require('../../validation/parse');

const Transaction = require('../../models/Transaction');
const WarframeCount = require('../../models/WarframeCount');

// @route   GET /api/transactions/
// @desc    Retrieves transaction log for user
// @access  Private
Router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Transaction.find({ name: req.user.name })
        .then(transactions => {
            res.status(200).json(transactions);
        });
});

// @route   POST /api/transactions/
// @desc    Creates new transaction in log and updates count db
// @access  Private
// TODO: test logic in route
Router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateTransactionInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    // Make sure that items is a string in the format of "^%+_^%+_..." where ^ is any prime and + is the part
    // An array will be returned with "^%+" in each element.
    // The array will be looped through and the "^" will be placed in the 'warframe' variable
    // and the "+" will be placed in the 'part' variable.
    const items = parseTransactionItems(req.body.items);

    items.forEach(item => {
        const warframe = item.substring(0, item.indexOf("%"));
        const part = item.substring(item.indexOf("%") + 1);

        if (part === 'blueprint') {
            WarframeCount.findOne({ name: req.user.name, warframe })
                .then(frame => {
                    if (req.body.sale === 'WTB') {
                        frame.blueprint++;
                    } else if (req.body.sale === 'WTS') {
                        frame.blueprint--;
                    }
                    frame.save();
                });
        } else if (part === 'helmet') {
            WarframeCount.findOne({ name: req.user.name, warframe })
                .then(frame => {
                    if (req.body.sale === 'WTB') {
                        frame.helmet++;
                    } else if (req.body.sale === 'WTS') {
                        frame.helmet--;
                    }
                    frame.save();
                });
        } else if (part === 'chassis') {
            WarframeCount.findOne({ name: req.user.name, warframe })
                .then(frame => {
                    if (req.body.sale === 'WTB') {
                        frame.chassis++;
                    } else if (req.body.sale === 'WTS') {
                        frame.chassis--;
                    }
                    frame.save();
                });
        } else if (part === 'systems') {
            WarframeCount.findOne({ name: req.user.name, warframe })
                .then(frame => {
                    if (req.body.sale === 'WTB') {
                        frame.systems++;
                    } else if (req.body.sale === 'WTS') {
                        frame.systems--;
                    }
                    frame.save();
                });
        }
    });

    const newTransaction = new Transaction({
        name: req.user.name,
        items,
        price: req.body.price,
        sale: req.body.sale,
    });

    newTransaction.save()
        .then(transaction => res.json(transaction));
});

// @route   DELETE /api/transactions/
// @desc    Deletes specified transaction
// @access  Private
Router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {

    Transaction.findOne({ name: req.user.name, items: req.body.items })
        .then(transaction => {
            Transaction.deleteOne({ _id: transaction._id })
                .then(() => res.json({ msg: "Delete Successful" }));
        });
});

module.exports = Router;