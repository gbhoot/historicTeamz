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
// app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static(path.join(__dirname, './public/dist/public')));
// app.set('views', path.join(__dirname, './views'));
// app.set('view engine', 'ejs');

require('./server/config/routes.js')(app);

app.listen(8000);