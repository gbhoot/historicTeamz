var socketio = require('socket.io'),
    io = {},
    futbalTeams = require('../controllers/futbalteams.js');

module.exports = function(server) {
    io = socketio.listen(server);

    io.sockets.on('connection', function(socket) {
        socket.on('team_view', function(data) {
            console.log(data);
            futbalTeams.addViewForTeam(data['ftid'], function(data) {
                if (data['message'] == 'Success') {
                    console.log(data['team']);
                } else {
                    console.log(data['error']);
                };
            });
        });
    });
}