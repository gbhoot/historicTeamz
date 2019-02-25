var countries = require('../controllers/countries.js'),
    competitions = require('../controllers/competitions.js'),
    teams = require('../controllers/teams.js'),
    players = require('../controllers/players.js'),
    games = require('../controllers/games.js'),
    futbalTeams = require('../controllers/futbalteams.js');

module.exports = function(app) {
    
    // Renders
    app.get('/', function(req, res) {
        res.render('index');
    });

    app.get('/team/:id', function(req, res) {
        futbalTeams.renderTeam(req, res);
    });

    app.get('/games/createGame', function(req, res) {
        res.render('createGame');
    });

    // Database
    // Get all the countries in the database
    app.get('/db/v2/countries', function(req, res) {
        countries.getAll(req, res);
    });

    // Get all countries with given query
    app.put('/db/v2/countries/query', function(req, res) {
        countries.getAllWithName(req, res);
    });

    // Get one country by ID
    app.get('/db/v2/countries/:id', function(req, res) {
        countries.getOne(req, res);
    });

    // Create country
    app.post('/db/v2/countries', function(req, res) {
        countries.create(req,);
    });

    // Get one competition by ID
    app.get('/db/v2/competitions/:id', function(req, res) {
        competitions.getOne(req, res);
    });

    // Get multiple competitions by IDs
    app.get('/db/v2/competitions/multiple', function(req, res) {
        competitions.getMultiple(req, res);
    });

    // Get all the competitions for specific team by ID
    app.get('/db/v2/teams/:id/competitions', function(req, res) {
        competitions.getAllCompetitionsForTeam(req, res);
    });

    // Create competition
    app.post('/db/v2/competitions', function(req, res) {
        competitions.create(req, res);
    });

    // Get all the teams in the database
    app.get('/db/v2/teams', function(req, res) {
        teams.getAll(req, res);
    });

    // Get all teams with given query
    app.put('/db/v2/teams/query', function(req, res) {
        teams.getAllWithName(req, res);
    });

    // Get all teams for country by ID
    app.get('/db/v2/teams/:country', function(req, res) {
        teams.getAllTeamsForCountry(req, res);
    });

    // Get all the team games for country by ID
    app.get('/db/v2/teams/games/:country', function(req, res) {
        teams.getAllTeamGamesForCountry(req, res);
    });

    // Get one team by ID
    app.get('/db/v2/teams/:id', function(req, res) {
        teams.getOne(req, res);
    });

    // Get multiple teams by IDs
    app.get('/db/v2/teams/multiple', function(req, res) {
        teams.getMultiple(req, res);
    });

    // Create team
    app.post('/db/v2/teams', function(req, res) {
        teams.create(req, res);
    });

    // Delete team
    app.delete('/db/v2/teams/:id', function(req, res) {
        teams.delete(req, res);
    });

    // Add badge URL to team by ID
    app.put('/db/v2/teams/:id/badge', function(req, res) {
        teams.addBadgeForTeam(req, res);
    });

    // Get all the players in the database
    app.get('/db/v2/players', function(req, res) {
        players.getAll(req, res);
    });

    // Get one player by ID
    app.get('/db/v2/players/:id', function(req, res) {
        players.getOne(req, res);
    });

    // Get all players with query
    app.put('/db/v2/players/query', function(req, res) {
        players.getAllWithName(req, res);
    });

    // Get multiple players by IDs
    app.get('/db/v2/players/multiple', function(req, res) {
        players.getMultiple(req, res);
    });

    // Create player
    app.post('/db/v2/players', function(req, res) {
        teams.create(req, res);
    });

    // Edit player by ID
    app.put('/db/v2/players/:id', function(req, res) {
        players.edit(req, res);
    });    

    // Add image URL to player by ID
    app.put('/db/v2/players/:id/image', function(req, res) {
        players.addImageForPlayer(req, res);
    });

    // Delete player
    app.delete('/db/v2/players/:id', function(req, res) {
        players.delete(req, res);
    });

    // Get one game by ID
    app.get('/db/v2/games/:id', function(req, res) {
        games.getOne(req, res);
    });

    // Get all the games in the database for specific team by ID
    app.get('/db/v2/games/:team', function(req, res) {
        games.getAllGamesForTeam(req, res);
    });

    // Get all the games in the database for specific team by ID and then for competition by ID
    app.get('/db/v2/games/:team/:comp', function(req, res) {
        games.getAllGamesForTeamAndCompetition(req, res);
    });

    // Version One
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