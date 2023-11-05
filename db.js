const express= require('express');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'bava1998',
    database:'qrbus'
});

// connection.connect(function(err){
//     if(err) throw err;
//     console.log('db connected');
// });

module.exports=connection;