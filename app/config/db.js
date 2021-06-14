'use strict'
const mysql = require("mysql");
// const dbConfig = require("./db.config.js");

// var connection = mysql.createConnection({
//     host: dbConfig.HOST,
//     user: dbConfig.USER,
//     password: dbConfig.PASSWORD,
//     database: dbConfig.DB,
// });

var connection = mysql.createConnection({
    host     : process.env.OPENSHIFT_MYSQL_DB_HOST,
    user     : process.env.OPENSHIFT_MYSQL_DB_USERNAME,
    password : process.env.OPENSHIFT_MYSQL_DB_PASSWORD,
    port     : process.env.OPENSHIFT_MYSQL_DB_PORT,
    database : process.env.OPENSHIFT_APP_NAME
});

connection.connect(function(err) {
    if (err) {
        console.log("Error in connecting:" + err.stack);
        return
    }
    console.log('Connected as thread id:' + connection.threadId);
});

module.exports = connection;