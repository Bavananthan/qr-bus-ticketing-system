const express = require('express');
const bodyParser = require('body-parser');
const app =express();

var db = require('./db.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


db.connect((err) => {
    if (err) {
      console.error('Database connection error: ' + err.message);
    } else {
      console.log('Connected to the MySQL database');
    }
  });
  
  app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Database error' });
      } else if (results.length === 1) {
        res.json({ message: 'Login successful' });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    });
  });
  


app.listen(3000,console.log("your server is start"));