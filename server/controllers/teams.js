var Team = require('../models/team.js'),
    games = require('../controllers/games.js'),
    countries = require('../controllers/countries.js');

module.exports = {
    getOne: function(req, res) {
        let tid = req.params.id;
        Team.find({_id: tid}, function(error, teams) {
            if (error) {
                console.log("There was an issue: ", error['message']);
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
                console.log("There was an issue: ", error['message']);
                res.json(error);
            } else {
                let response = {};
                if (teams.length) {
                    response = {
                        message: "Success",
                        teams: teams
                    };
                } else {
                    response = {
                        message: "Failure",
                        content: "No teams found"
                    };    
                }
                res.json(response);
            };    
        });
    },

    getAllWithName: function(req, res) {
        let query = req.body['name'];
        var reg = new RegExp(query, 'i');
        Team.find({name: reg}, function(error, teams) {
            if (error) {
                console.log("There was an issue: ", error['message']);
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

    getMultiple: function(req, res) {
        let tids = req.body['teams'];
        Team.find({_id: tids}, function(error, teams) {
            if (error) {
                console.log("There was an issue: ", error['message']);
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

    getAllTeamsForCountry: function(req, res) {
        let cid = req.params.country;
        countries.getOneCB(cid, function(response) {
            if (response['message'] == "Success") {
                Team.find({country: cid}, function(error, teams) {
                    if (error) {
                        console.log("There was an issue: ", error['message']);
                        res.json(error);
                    } else {
                        let repsonse = {};
                        if (teams.length) {
                            response = {
                                message: "Success",
                                teams: teams
                            };
                        } else {
                            response = {
                                message: "Failure",
                                content: "No teams found for country with ID: "+ cid
                            };
                        };
                        res.json(response);
                    };
                });
            } else {
                response = {
                    message: "Failure",
                    content: "No country found for ID: ", cid
                };
                res.json(response);
            };
        });
    },

    getAllTeamGamesForCountry: function(req, res) {
        let cid = req.params.country;
        countries.getOneCB(cid, function(response) {
            if (response['message'] == "Success") {
                games.getAllTeamsForCountryCB(cid, function(response) {
                    if (response['message'] == "Success") {
                        let tids = response['teams'];
                        Team.find({_id: tids}, function(error, teams) {
                            if (error) {
                                console.log("There was an issue: ", error['message']);
                                res.json(error);
                            } else {
                                if (teams.length) {
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
                    } else {
                        res.json(response);
                    };
                });
            } else {
                response = {
                    message: "Failure",
                    content: "No country found for ID, ", cid
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
                console.log("There was an issue: ", error['message']);
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
                console.log("There was an issue: ", error['message']);
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
                console.log("There was an issue: ", error['message']);
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