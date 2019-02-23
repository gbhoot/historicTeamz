var mongoose = require('../config/mongoose.js'),
    validators = require('mongoose-validators');

var TeamSchema = new mongoose.Schema({
    name: {type: String, required: true},
    country: {type: String, required: true},
    badge: {type: String}
}, {timestamps: true});

var Teams = mongoose.model('Teams', TeamSchema);

module.exports = Teams;