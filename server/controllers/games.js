var Game = require('../models/game.js');

module.exports = {
    getAll: function(req, res) {
        Game.find({}, function(error, games) {
            if (error) {
                console.log("There was an issue: ", error['message']);
                res.json(error);
            } else {
                let response = {};
                if (games.length) {
                    response = {
                        message: "Success",
                        games: games
                    };
                } else {
                    response = {
                        message: "Failure",
                        content: "No games found"
                    };
                };
                res.json(response);
            };
        });
    },

    getOne: function(req, res) {
        let gid = req.params.id;
        Game.find({_id: gid}, function(error, games) {
            if (error) {
                console.log("There was an issue: ", error['message']);
                res.json(error);
            } else {
                let response = {};
                if (games && games.length == 1) {
                    response = {
                        message: "Success",
                        game: games[0]
                    };
                } else {
                    response['message'] = "Failure"
                    if (games.length > 1) {
                        response['content'] = "Multiple results";
                    } else {
                        response['content'] = "No results";
                    }
                }
                res.json(response);
            };
        });
    },

    getAllByViews: function(req, res) {
        Game.find({}, function(error, games) {
            if (error) {
                console.log("There was an issue: ", error['message']);
                res.json(error);
            } else {
                let response = {};
                if (games) {
                    response = {
                        message: "Success",
                        games: games
                    };
                } else {
                    response = {
                        message: "Failure",
                        content: "No teams found"
                    };
                };
                res.json(response);
            }
        }).sort({views: -1});
    },

    getAllTeamsForCountry: function(req, res) {
        let cid = req.params.country;
        Game.find({country: cid}, function(error, games) {
            if (error) {
                console.log("There was an issue: ", error['message']);
                res.json(error);
            } else {
                let response = {};
                if (games) {
                    Game.distinct('team', {country: cid}, function(error, teams) {
                        if (error) {
                            console.log("There was an issue: ", error['message']);
                            res.json(error);
                        } else {
                            if (teams) {
                                teams.sort();
                                response = {
                                    message: "Success",
                                    teams: teams
                                };
                            } else {
                                response = {
                                    message: "Failure",
                                    content: "No teams found for country"
                                };
                            };
                            res.json(response);
                        };
                    });
                } else {
                    response = {
                        message: "Failure",
                        content: "No games found for country"
                    }
                    res.json(response);
                };
            };
        });
    },

    getAllTeamsForCountryCB: function(cid, callback) {
        Game.find({country: cid}, function(error, games) {
            if (error) {
                console.log("There was an issue: ", error['message']);
                callback(error);
            } else {
                let response = {};
                if (games.length) {
                    Game.distinct('team', {country: cid}, function(error, teams) {
                        if (error) {
                            console.log("There was an issue: ", error['message']);
                            callback(error);
                        } else {
                            response = {
                                message: "Success",
                                teams: teams
                            };
                            callback(response);
                        };
                    });
                } else {
                    response = {
                        message: "Failure",
                        content: "No games found for country"
                    }
                    callback(response);
                };
            };
        });
    },

    getAllGamesForTeam: function(req, res) {
        let tid = req.params.team;
        Game.find({team: tid}, function(error, games) {
            if (error) {
                console.log("There was an issue: ", error['message']);
                res.json(error);
            } else {
                let response = {};
                if (games) {
                    response = {
                        message: "Success",
                        games: games
                    };
                } else {
                    response = {
                        message: "Failure",
                        content: "No games found"
                    };
                };
                res.json(response);
            }
        }).sort({season: -1});
    },

    getAllGamesForTeamAndCompetition: function(req, res) {
        let tid = req.params.team;
        let compid = req.params.comp;
        Game.find({team: tid, competition: compid}, function(error, games) {
            if (error) {
                console.log("There was an issue: ", error['message']);
                res.json(error);
            } else {
                let response = {};
                if (games) {
                    response = {
                        message: "Success",
                        games: games
                    };
                } else {
                    response = {
                        message: "Failure",
                        content: "No games found for team & comp"
                    };
                };
                res.json(response);
            };
        });
    },

    getAllGamesForCompetition: function(req, res) {
        let compid = req.params.comp;
        Game.find({competition: compid}, function(error, games) {
            if (error) {
                console.log("There was an issue: ", error['message']);
                res.json(error);
            } else {
                let response = {};
                if (games) {
                    response = {
                        message: "Success",
                        games: games
                    };
                } else {
                    response = {
                        message: "Failure",
                        content: "No games found"
                    };
                };
                res.json(response);
            };
        });
    },

    create: function(req, res) {
        let inc_game = req.body;
        let game = new Game(inc_game);
        game.save(function(error) {
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

    delete: function(req, res) {
        let gid = req.params.id;
        Game.deleteOne({_id: gid}, function(error) {
            if (error) {
                console.log("There was an issueL ", error['message']);
                res.json(error);
            } else {
                let response = {
                    message: "Success"
                };
                res.json(response);
            };
        });
    },

    renderGame: function(req, res) {
        let gid = req.params.id;
        Game.find({_id: gid}, function(error, games) {
            if (error) {
                console.log("There was an issue: ", error['message']);
                res.render('team', {message: "Error", error: error});
            } else {
                let response = {};
                if (games && games.length == 1) {
                    response = {
                        message: "Success",
                        game: games[0]
                    };
                } else {
                    response['message'] = "Failure";
                    if (games.length > 1) {
                        response['content'] = "Multple results"
                    } else {
                        response['content'] = "No results"
                    };
                };
                res.render('team', response);
            };
        });
    },

    addViewForGame: function(req, res) {
        let gid = req.params.id;
        let opts = { runValidators: true };
        Game.updateOne({_id: game}, {$inc: {views: 1}}, {upsert: true}, function(error) {
            if (error) {
                console.log("There was an issue: ", error['message']);
                res.json(error);
            } else {
                let response = {
                    message: "Success",
                    content: "View successfully added to game"
                };
                res.json(response);
            };
        });
    },

    addViewForTeamCB: function(gid, callback) {
        let opts = { runValidators: true };
        Game.updateOne({_id: gid}, {$inc: {views: 1}}, {upsert: true}, function(error) {
            let response = {};
            if (error) {
                console.log("There was an issue: ", error['message']);
                callback(error);
            } else {
                Game.find({_id: gid}, function(error, games) {
                    if (error) {
                        console.log("There was an issue: ", error['message']);
                        callback(error);
                    } else {
                        if (games && games.length == 1) {
                            response = {
                                message: "Success",
                                game: games[0]
                            };
                        } else {
                            response['message'] = "Failure";
                            if (games.length > 1) {
                                response['content'] = "Multiple results";
                            } else {
                                response['content'] = "No results";
                            }
                        };
                        callback(response);
                    };
                });
            };
        });
    },

    addBadgeToTeam: function(req, res) {
        let gid = req.params.id;
        let inc_game = req.body;
        let opts = { runValidators: true };
        Game.updateOne({_id: gid}, inc_game, opts, function(error) {
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
}
