var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    session = require('express-session')({
        secret: "ssssssssshhhh",
        saveUninitialized: true,
        autoSave: true,
        resave: false
    });

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session);
app.use(express.static(path.join(__dirname, 'static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

require('./server/config/routes.js')(app);

var server = app.listen(8000);
// var io = require('socket.io')(server);
require('./server/config/socket.js')(server);

// io.on('connection', )