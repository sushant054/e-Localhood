const express = require('express');
const bodyParser = require('body-parser');

const mysql = require('mysql');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
// MySQL Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password', // Replace with your actual MySQL password
    database: 'user_registration',
    insecureAuth: true,
    authPlugin: 'mysql_native_password',
});
// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        throw err;
    } else {
        console.log('Connected to MySQL');
    }
});
// Register endpoint
app.post('/v1/register', (req, res) => {
    const { email, password } = req.body;

    // Validate request body
    if (!email || !password) {
        return res.status(400).json({ error: 'Bad Request - Missing Email or Password' });
    }
    // Insert user into the database
    const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
    db.query(query, [email, password], (err) => {
        if (err) {
            console.error('MySQL Error:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        return res.status(201).json({ message: 'User registered successfully' });
    });
});
// Error handling middleware
app.use((err, req, res, next) => { 
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
// if you don't have front end for this code...you can also use postman
/* Database cmd:
CREATE DATABASE user_registration;
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);
*/
