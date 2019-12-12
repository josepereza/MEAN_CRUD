const mysql= require('mysql');

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'apirest'
});

connection.connect( (error) => {
    if (error) throw(error);
    console.log('SERVER CONNECTED TO THE DATABASE');
});

module.exports = connection;