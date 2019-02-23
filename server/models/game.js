var mongoose = require('../config/mongoose.js'),
    validators = require('mongoose-validators');

var GameSchema = new mongoose.Schema({
    team: {type: String, required: true},
    opposition: {type: String, required: true},
    competition: {type: String, required: true},
    season: {type: Number, required: true},
    home: {type: Boolean, required: true},
    score: {type: [Number], required: true},
    views: {type: Number},
    starters: {},
    bench: []
}, {timestamps: true});

var Games = mongoose.model('Games', GameSchema);

module.exports = Games;