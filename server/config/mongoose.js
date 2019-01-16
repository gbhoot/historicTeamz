var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/historic_teams');

module.exports = mongoose;