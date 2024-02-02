const express = require('express');
const mysql = require('./database'); // this imports the database connection
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// user registration API
app.post('/v1/signup', (req, res) => {
    const { Name, PhoneNumber, Password, Email } = req.body;

    // Check if required fields are provided
    if (!Name || !PhoneNumber || !Password || !Email) {
        return res.status(400).json({ error: 'Invalid Registration Information' });
    }

    // Use the imported database connection
    mysql.query('SELECT * FROM users WHERE email = ?', [Email], (err, results) => {
        if (err) {
            console.error('MySQL error:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.length > 0) {
            return res.status(409).json({ error: 'Email already exists' });
        }

        // Insert the new user into the database
        mysql.query(
            'INSERT INTO users (name, phone_number, password, email) VALUES (?, ?, ?, ?)',
            [Name, PhoneNumber, Password, Email],
            (err, results) => {
                if (err) {
                    console.error('MySQL error:', err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }

                const userId = results.insertId;
                res.status(201).json({ user_id: userId, email: Email });
            }
        );
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
