var Competition = require('../models/competition.js');

module.exports = {
    getOne: function(req, res) {
        let compid = req.params.id;
        Competition.find({_id: compid}, function(error, competitions) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                let response = {};
                if (competitions && competitions.length == 1) {
                    response = {
                        message: "Success",
                        competition: competitions[0]
                    };
                } else {
                    response['message'] = "Failure";
                    if (competitions.length > 1) {
                        response['content'] = "Multiple results";
                    } else {
                        response['content'] = "No results";
                    };
                };
                res.json(response);
            };
        });
    },

    create: function(req, res) {
        let inc_comp = req.body;
        let competition = new Competition(inc_comp);
        competition.save(function(error) {
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
        let compid = req.params.id;
        let edit_comp = req.body;
        Competition.update({_id: compid}, edit_comp, function(error) {
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

    addLogoForComp: function(req, res) {
        let compid = req.params.id;
        let logoURL = req.body['logo'];
        Competition.update({_id: compid}, {logo: logoURL}, function(error) {
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