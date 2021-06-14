'use strict'
const mysql = require("mysql");
const dbConfig = require("./db.config.js");

// var connection = mysql.createConnection({
//     host: dbConfig.HOST,
//     user: dbConfig.USER,
//     password: dbConfig.PASSWORD,
//     database: dbConfig.DB,
// });

// var connection = mysql.createConnection({
//     host     : "172.30.167.49",
//     port     : process.env.OPENSHIFT_MYSQL_DB_PORT,
//     user     : 'db_user',
//     password : 'Anka@1234',
//     database : 'node_app'
// });

var connection = mysql.createConnection(process.env.OPENSHIFT_MYSQL_DB_URL + 'node_app');


connection.connect(function(err) {
    if (err) {
        console.log("Error in connecting:" + err.stack);
        return
    }
    console.log('Connected as thread id:' + connection.threadId);
});

module.exports = connection;