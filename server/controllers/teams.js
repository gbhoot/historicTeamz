var Team = require('../models/team.js');

module.exports = {
    getOne: function(req, res) {
        let tid = req.params.id;
        Team.find({_id: tid}, function(error, teams) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                let response = {};
                if (teams && teams.length == 1) {
                    response = {
                        message: "Success",
                        team: teams[0]
                    };
                } else {
                    response['message'] = "Failure"
                    if (teams.length > 1) {
                        response['content'] = "Multiple results"
                    } else {
                        response['content'] = "No results"
                    }
                };
                res.json(response);
            };
        });
    },

    getAll: function(req, res) {
        Team.find({}, function(error, teams) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                let response = {
                    message: "Success",
                    teams: teams
                };    
                res.json(response);
            };    
        });    
    },

    getAllTeamsForCountry: function(req, res) {
        let cid = req.params.country;
        Team.find({country: cid}, function(error, teams) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                let response = {};
                if (teams) {
                    response = {
                        message: "Success",
                        teams: teams    
                    };
                } else {
                    response = {
                        message: "Failure",
                        content: "No teams found"
                    };
                };
                res.json(response);
            };    
        });
    },

    create: function(req, res) {
        let inc_team = req.body;
        let team = new Team(inc_team);
        team.save(function(error) {
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
        let tid = req.params.id;
        let edit_team = req.body;
        Team.update({_id: tid}, edit_team, function(error) {
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
    
    addBadgeForTeam: function(req, res) {
        let tid = req.params.id;
        let badgeURL = req.body['badge'];
        Team.update({_id: tid}, {badge: badgeURL}, function(error) {
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
    }
}