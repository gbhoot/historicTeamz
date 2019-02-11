const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
    contactPoints: ['127.0.0.1:9042'],
    authProvider: new cassandra.auth
    .PlainTextAuthProvider('developer', 'devpassword')
});

var keyspace = ("CREATE KEYSPACE IF NOT EXISTS historicTeamz "+
    "WITH REPLICATION = { 'class': 'SimpleStrategy', "+
    "'replication_factor': 1};")

var table = ("CREATE TABLE IF NOT EXISTS "+
    "players(id uuid PRIMARY KEY, fName text, lName text);");

client.execute(keyspace).then(() => {
    client.execute(table, (err, result) => {
        console.log(err, result);
    });
});

client.connect(function(err, result) {
    if (err) {
        console.log("There was an issue: ", err);
    } else {
        console.log('Cassandra connected: ', result);
    }
});

module.exports = client;