var mongoose = require('../config/mongoose.js'),
    validators = require('mongoose-validators');

var FutballTeamSchema = new mongoose.Schema({
    country: {type: String, required: true},
    organization: {type: String, required: true},
    season: {type: Number, required: true},
    game: {type: String, required: true},
    opposition: {type: String, required: true},
    home: {type: Boolean, required: true},
    score: {type: [Number], required: true},
    defenders: {type: Number, required: true},
    wingbacks: {type: Number, required: true},
    defensiveMids: {type: Number, required: true},
    midfielders: {type: Number, required: true},
    attackingMids: {type: Number, required: true},
    wingers: {type: Number, required: true},
    forwards: {type: Number, required: true},
    starters: {
        // gk: {enabled: false, fName: String, lName: String},
        // rb: {enabled: false, fName: String, lName: String},
        // rcb: {enabled: false, fName: String, lName: String},
        // cb: {enabled: false, fName: String, lName: String},
        // lcb: {enabled: false, fName: String, lName: String},
        // lb: {enabled: false, fName: String, lName: String},
        // rwb: {enabled: false, fName: String, lName: String},
        // rdm: {enabled: false, fName: String, lName: String},
        // cdm: {enabled: false, fName: String, lName: String},
        // ldm: {enabled: false, fName: String, lName: String},
        // lwb: {enabled: false, fName: String, lName: String},
        // rm: {enabled: false, fName: String, lName: String},
        // rcm: {enabled: false, fName: String, lName: String},
        // cm: {enabled: false, fName: String, lName: String},
        // lcm: {enabled: false, fName: String, lName: String},
        // lm: {enabled: false, fName: String, lName: String},
        // rw: {enabled: false, fName: String, lName: String},
        // ram: {enabled: false, fName: String, lName: String},
        // cam: {enabled: false, fName: String, lName: String},
        // lam: {enabled: false, fName: String, lName: String},
        // lw: {enabled: false, fName: String, lName: String},
        // str: {enabled: false, fName: String, lName: String},
        // cf: {enabled: false, fName: String, lName: String},
        // stl: {enabled: false, fName: String, lName: String},
        // {fName: String, lName: String, position: String}
    },
    bench: [
        {fName: String, lName: String}
    ]
}, {timestamps: true});

var FutbalTeams = mongoose.model('FutbalTeams', FutballTeamSchema);

module.exports = FutbalTeams;