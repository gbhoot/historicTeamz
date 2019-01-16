var mongooose = require('../config/mongoose.js'),
    validators = require('mongoose-validators');

var UserSchema = mongooose.Schema({
    username: {type: String, required: true}
}, {timestamps: true});

var Users = mongooose.model('User', UserSchema);

module.exports = Users;