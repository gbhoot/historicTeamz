var Player = require('../models/player.js');

module.exports = {
    getAll: function(req, res) {
        Player.find({}, function(error, players) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                let response = {
                    message: "Success",
                    players: players
                };
                res.json(response);
            };
        });
    },

    getOne: function(req, res) {
        let pid = req.params.id;
        Player.find({_id: pid}, function(error, players) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                let response = {};
                if (players && players.length == 1) {
                    response = {
                        message: "Succes",
                        player: players[0]
                    };
                } else {
                    response['message'] = "Failure";
                    if (players.length > 1) {
                        response['content'] = "Multiple results";
                    } else {
                        response['content'] = "Multiple results";
                    }
                }
                res.json(response);
            };
        });
    },

    create: function(req, res) {
        let inc_player = req.body;
        let player = new Player(inc_player);
        player.save(function(error) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                let response = {
                    message: "Success"
                };
                res.json(response);
            };
        });
    },

    edit: function(req, res) {
        let pid = req.params.id;
        let edit_player = req.body;
        Player.update({_id: pid}, edit_player, function(error) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                let response = {
                    message: "Success"
                };
                res.json(response);
            };
        });
    },

    addImageForPlayer: function(req, res) {
        let pid = req.params.id;
        let imageURL = req.body['image'];
        Player.update({_id: pid}, {image: imageURL}, function(error) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                let response = {
                    message: "Success"
                };
                res.json(response);
            };
        });
    },
}