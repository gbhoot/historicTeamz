var Country = require('../models/country.js');

module.exports = {
    getAll = function(req, res) {
        Country.find({}, function(error, countries) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                let response = {
                    message: "Success",
                    countries: countries
                };
                res.json(response);
            };
        });
    },

    getOne: function(req, res) {
        let cid = req.params.id;
        Country.find({_id: cid}, function(error, countries) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                let response = {};
                if (countries && countries.length == 1) {
                    response = {
                        message: "Success",
                        country: countries[0]
                    };
                } else {
                    response['message'] = "Failure";
                    if (countries.length > 1) {
                        response['content'] = "Multuple results";
                    } else {
                        response['content'] = "No results";
                    }
                };
                res.json(response);
            };
        });
    },
    
    create: function(req, res) {
        let inc_country = req.body;
        let country = new Country(inc_country);
        country.save(function(error) {
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
        let edit_country = req.body;
        let cid = req.params.id;
        Country.update({_id: cid}, edit_country, function(error) {
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