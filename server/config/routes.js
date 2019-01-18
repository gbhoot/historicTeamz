var path = require('path'),
    futbalTeams = require('../controllers/teams.js');

module.exports = function(app) {
    
    // Renders
    // app.get('/', function(req, res) {
    //     res.render('index');
    // });

    // app.get('/team/:id', function(req, res) {
    //     futbalTeams.renderTeam(req, res);
    // });

    // Database
    // Get all football teams
    app.get('/db/v1/futbalTeams', function(req, res) {
        futbalTeams.getAll(req, res);
    });

    // Get all countries
    app.get('/db/v1/futbalTeams/countries', function(req, res) {
        futbalTeams.getAllCountries(req, res);
    });

    // Get all organizations for country
    app.get('/db/v1/futbalTeams/countries/:country/organizations', function(req, res) {
        futbalTeams.getAllOrganizationsForCountry(req, res);
    });    

    // Get all organizations
    app.get('/db/v1/futbalTeams/organizations', function(req, res) {
       futbalTeams.getAllOrganizations(req, res);  
    });   
    
    // Get all teams for organization
    app.get('/db/v1/futbalteams/organizations/:organization/teams', function(req, res) {
        futbalTeams.getAllGamesForOrganization(req, res);
    });

    // Get single team by ID
    app.get('/db/v1/futbalTeams/teams/:id', function(req, res) {
        futbalTeams.getOne(req, res);
    });                

    // Create new team document
    app.post('/db/v1/futbalTeams', function(req, res) {
        futbalTeams.createTeam(req, res);
    });

    // Delete single team document by ID
    app.delete('/db/v1/futbalTeams/:id', function(req, res) {
        futbalTeams.deleteTeam(req, res);
    });

    // Remaining routes direct to front-end Angular app
    app.all("**", function(req, res, next) {
        res.sendFile(path.resolve(__dirname, '../../public/dist/public/index.html'));
    });
}