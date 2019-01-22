var FutbalTeam = require('../models/futbalteam.js');

module.exports = {
    getAll: function(req, res) {
        FutbalTeam.find({}, function(error, teams) {
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

    getOne: function(req, res) {
        let ftid = req.params.id;
        FutbalTeam.find({_id: ftid}, function(error, teams) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                let team = teams[0];
                let response = {};
                if (team) {
                    response = {
                        message: "Success",
                        team: team
                    };
                } else {
                    response = {
                        message: "Failure"
                    }
                }
                res.json(response);
            };
        });
    },

    getAllByViews: function(req, res) {
        FutbalTeam.find({}, function(error, teams) {
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
            }
        }).sort({views: -1});
    },

    getAllCountries: function(req, res) {
        FutbalTeam.distinct('country', function(error, countries) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                countries.sort();
                let response = {
                    message: "Success",
                    countries: countries
                };
                res.json(response);
            };
        });
    },

    getAllOrganizations: function(req, res) {
        FutbalTeam.distinct('organization', function(error, organizations) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                organizations.sort
                let response = {
                    message: "Success",
                    organizations: organizations
                };
                res.json(response);
            };
        });
    },

    getAllOrganizationsForCountry: function(req, res) {
        let country = req.params.country;
        FutbalTeam.find({country: country}, function(error, teams) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                let response = {};
                if (teams) {
                    FutbalTeam.distinct('organization', {country: country}, function(error, organizations) {
                        if (error) {
                            console.log("There was an issue: ", error);
                            res.json(error);
                        } else {
                            if (organizations) {
                                organizations.sort();
                                response = {
                                    message: "Success",
                                    organizations: organizations
                                };
                            } else {
                                response = {
                                    message: "Failure",
                                };
                            };
                            res.json(response);
                        };
                    });
                } else {
                    response = {
                        message: "Failure"
                    };
                    res.json(response);
                };
            };
        });
    },

    getAllTeamsForOrganization: function(req, res) {
        let organization = req.params.organization;
        FutbalTeam.find({organization: organization}, function(error, teams) {
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
                        message: "Failure"
                    };
                }
                res.json(response);
            };
        }).sort({season: -1});
    },

    createTeam: function(req, res) {
        let inc_team = req.body;
        let team = new FutbalTeam(inc_team);
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

    deleteTeam: function(req, res) {
        let ftid = req.params.id;
        FutbalTeam.deleteOne({_id: ftid}, function(error) {
            if (error) {
                console.log("There was an issueL ", error);
                res.json(error);
            } else {
                let response = {
                    message: "Success"
                };
                res.json(response);
            };
        });
    },

    renderTeam: function(req, res) {
        let ftid = req.params.id;
        FutbalTeam.find({_id: ftid}, function(error, teams) {
            if (error) {
                console.log("There was an issue: ", error);
                res.render('team', {message: "Error", error: error});
            } else {
                let response = {};
                if (teams) {
                    let team = teams[0];
                    response = {
                        message: "Success",
                        team: team
                    };
                } else {
                    response = {
                        message: "Failure"
                    };
                };
                res.render('team', response);
            };
        });
    },

    addViewForTeam: function(ftid, callback) {
        let opts = { runValidators: true };
        FutbalTeam.updateOne({_id: ftid}, {$inc: {views: 1}}, {upsert: true}, function(error) {
            let response = {};
            if (error) {
                console.log("There was an issue: ", error);
                callback(error);
            } else {
                FutbalTeam.find({_id: ftid}, function(error, teams) {
                    if (error) {
                        console.log("There was an issue: ", error);
                        callback(error);
                    } else {
                        if (teams) {
                            let team = teams[0];
                            response = {
                                message: "Success",
                                team: team
                            };
                        } else {
                            response = {
                                message: 'Failure',
                                countent: 'No teams exist with this ID'
                            };
                        };
                        callback(response);
                    };
                });
            };
        });
    },

    addBadgeToTeam: function(req, res) {
        let ftid = req.params.id;
        let inc_team = req.body;
        let opts = { runValidators: true };
        FutbalTeam.updateOne({_id: ftid}, inc_team, opts, function(error) {
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
