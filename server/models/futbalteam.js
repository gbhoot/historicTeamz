var mongoose = require('../config/mongoose.js'),
    validators = require('mongoose-validators');

var FutballTeamSchema = new mongoose.Schema({
    country: {type: String, required: true},
    organization: {type: String, required: true},
    badge: {type: String},
    season: {type: Number, required: true},
    game: {type: String, required: true},
    opposition: {type: String, required: true},
    home: {type: Boolean, required: true},
    score: {type: [Number], required: true},
    defenders: {type: Number},
    wingbacks: {type: Number},
    defensiveMids: {type: Number},
    midfielders: {type: Number},
    attackingMids: {type: Number},
    wingers: {type: Number},
    forwards: {type: Number},
    views: {type: Number},
    starters: {},
    bench: [
        {fName: String, lName: String}
    ]
}, {timestamps: true});

var FutbalTeams = mongoose.model('FutbalTeams', FutballTeamSchema);

module.exports = FutbalTeams;