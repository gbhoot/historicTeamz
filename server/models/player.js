var mongoose = require('../config/mongoose.js'),
    validators = require('mongoose-validators');

var PlayerSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    country: {type: String, required: true},
    image: {type: String},
}, {timestamps: true});

var Players = mongoose.model('Players', PlayerSchema);

module.exports = Players;