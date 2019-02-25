var Country = require('../models/country.js');

module.exports = {
    getOne: function(req, res) {
        let cid = req.params.id;
        Country.find({_id: cid}, function(error, countries) {
            if (error) {
                console.log("There was an issue: ", error['message']);
                res.json(error);
            } else {
                let response = {};
                if (countries.length == 1) {
                    response = {
                        message: "Success",
                        country: countries[0]
                    };
                } else {
                    response['message'] = "Failure";
                    if (countries.length) {
                        response['content'] = "Multuple results";
                    } else {
                        response['content'] = "No results";
                    }
                };
                res.json(response);
            };
        });
    },

    getOneCB: function(cid, callback) {
        Country.find({_id: cid}, function(error, countries) {
            if (error) {
                console.log("There was an issue: ", error['message']);
                callback(error);
            } else {
                let response = {};
                if (countries.length == 1) {
                    response = {
                        message: "Success",
                        country: countries[0]
                    };
                } else {
                    response = {
                        message: "Failure",
                        content: "No country found for ID, ", cid
                    };
                };
                callback(response);
            };
        });
    },
    
    getAll: function(req, res) {
        Country.find({}, function(error, countries) {
            if (error) {
                console.log("There was an issue: ", error['message']);
                res.json(error);
            } else {
                let response = {};
                if (countries.length) {
                    response = {
                        message: "Success",
                        countries: countries
                    };
                } else {
                    response = {
                        message: "Failure",
                        content: "No countries found"
                    };
                };
                res.json(response);
            };
        });
    },

    getAllWithName: function(req, res) {
        let query = req.body['name'];
        console.log(query);
        Country.find({name: {$regex: query, $options: 'i'}}, function(error, countries) {
            if (error) {
                console.log("There was an issue: ", error['message']);
                res.json(error);
            } else {
                console.log(countries);
                let response = {};
                if (countries) {
                    response = {
                        message: "Success",
                        countries: countries
                    };
                } else {
                    response = {
                        message: "Failure",
                        content: "No countries found"
                    };
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
        let edit_country = req.body;
        let cid = req.params.id;
        Country.update({_id: cid}, edit_country, function(error) {
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