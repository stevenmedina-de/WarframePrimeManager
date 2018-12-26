const express = require('express');
const passport = require('passport');

const Router = express.Router();

const WarframeCount = require('../../models/WarframeCount');
const validateFrameInput = require('../../validation/frame');

// @route   GET /api/frames/
// @desc    Gets all primed warframe data.
// @access  Private
Router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    WarframeCount.find({ name: req.user.name })
        .then(frames => {
            if (frames.length === 0) {
                res.json({ msg: 'Add a primed item entry ' });
            } else {
                res.json(frames);
            }
        })
});

// @route   POST /api/frames/
// @desc    Creates primed warframe entry
// @access  Private
Router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateFrameInput(req.body);

    if (!isValid) {
        errors.msg = 'Fill in all form entries';
        res.status(400).json(errors);
    } else {
        const newFrame = new WarframeCount({
            name: req.user.name,
            warframe: req.body.warframe,
            helmet: req.body.helmet,
            chassis: req.body.chassis,
            systems: req.body.systems,
            blueprint: req.body.blueprint
        });
        newFrame.save()
            .then(frame => res.json(frame));
    }
});

// @route   PUT /api/frames/
// @desc    Updates warframe entry
// @access  Private
Router.put('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateFrameInput(req.body);

    if (!isValid) {
        errors.msg = 'Please update an entry';
        return res.status(400).json(errors);
    } else {
        WarframeCount.findOne({ name: req.user.name, warframe: req.body.warframe })
            .then(frame => {
                frame.helmet = req.body.helmet;
                frame.chassis = req.body.chassis;
                frame.systems = req.body.systems;
                frame.blueprint = req.body.blueprint;
                frame.save()
                    .then(updatedFrame => res.json(updatedFrame));
            });
    }
});

// @route   DELETE /api/frames/
// @desc    Deletes warframe entry
// @access  Private
Router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {

    WarframeCount.findOne({ name: req.user.name, warframe: req.body.warframe })
        .then(frame => {
            WarframeCount.deleteOne({ _id: frame._id })
                .then(() => res.json({ msg: "Delete Successful" }));
        });
});

module.exports = Router;