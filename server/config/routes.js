var futbalTeams = require('../controllers/teams.js');

module.exports = function(app) {
    
    // Renders
    app.get('/', function(req, res) {
        res.render('index');
    });

    app.get('/team/:id', function(req, res) {
        futbalTeams.renderTeam(req, res);
    });

    // Database
    app.get('/db/v1/futbalTeams', function(req, res) {
        futbalTeams.getAll(req, res);
    });

    app.get('/db/v1/futbalTeams/views', function(req, res) {
        futbalTeams.getAllByViews(req, res);
    });

    app.get('/db/v1/futbalTeams/countries', function(req, res) {
        futbalTeams.getAllCountries(req, res);
    });

    app.get('/db/v1/futbalTeams/countries/:country/organizations', function(req, res) {
        futbalTeams.getAllOrganizationsForCountry(req, res);
    });    

    app.get('/db/v1/futbalTeams/organizations', function(req, res) {
       futbalTeams.getAllOrganizations(req, res);  
    });   
    
    app.get('/db/v1/futbalteams/organizations/:organization/teams', function(req, res) {
        futbalTeams.getAllTeamsForOrganization(req, res);
    });

    app.get('/db/v1/futbalTeams/:id', function(req, res) {
        futbalTeams.getOne(req, res);
    });                

    app.post('/db/v1/futbalTeams', function(req, res) {
        futbalTeams.createTeam(req, res);
    });

    app.delete('/db/v1/futbalTeams/:id', function(req, res) {
        futbalTeams.deleteTeam(req, res);
    });

    app.post('/db/v1/futbalTeams/:id/addBadge', function(req, res) {
        futbalTeams.addBadgeToTeam(req, res);
    });

    app.get('/db/v1/futbalTeams/:id/addView', function(req, res) {
        futbalTeams.addViewForTeam(req, res);
    });
}