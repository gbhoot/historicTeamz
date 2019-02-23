var mongoose = require('../config/mongoose.js'),
    validators = require('mongoose-validators');

var CompetitionSchema = new mongoose.Schema({
    name: {type: String, required: true},
    logo: {type: String}
}, {timestamps: true});

var Competitions = mongoose.model('Competitions', CompetitionSchema);

module.exports = Competitions;