var mongoose = require('../config/mongoose.js'),
    validators = require('mongoose-validators');

var CountrySchema = new mongoose.Schema({
    name: {type: String, required: true},
    nationality: {type: String, required: true},
    flag: {type: String, required: true}
}, {timestamps: true});

var Countries = mongoose.model('Countries', CountrySchema);

module.exports = Countries;