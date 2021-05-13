var mysql = require('mysql');



var conn = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '123',
    database : 'PassVault1'
});

module.exports = conn;


