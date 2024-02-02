const express = require('express');//this import express js framework
const mysql = require('./database'); // here we will import..database connection
const bodyParser = require('body-parser');//this parse the json body...incoming request in our program
const app = express();//this allows you to define how your server should handle incoming requests&how to respond to them.
const PORT = 3000;
app.use(bodyParser.json());

/* Login endpoint....use (/v1/login)... like http://localhost:3000/v1/login
on postman to send server request*/
app.post('/v1/login', (req, res) => {
    //it extracts the Email and Password fields from the JSON request body.
    const { Email, Password } = req.body;

//REQUEST VALIDATION
    // Check if the request body has both email and password
    if (!Email || !Password) {
        return res.status(400).json({ error: 'Bad Request - Incorrect Email/Password' });
    }

    // Find user by email in the database
    const query = 'SELECT * FROM users WHERE email = ?';
    mysql.query(query, [Email], (err, results) => {
        if (err) {
            console.error('MySQL Error:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Check if the user exists
        if (results.length === 0) {
            return res.status(404).json({ error: 'Not Found' });
        }

        const user = results[0];

        // Check if the password is correct (in a real application, you'd use a secure method to compare hashed passwords)
        if (user.password !== Password) {
            return res.status(400).json({ error: 'Bad Request - Incorrect Email/Password' });
        }

        // Successful login!!!
        return res.status(200).json({ user_id: user.user_id, email: user.email });
    });
});

// Start the express server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

/*https://expressjs.com/en/4x/api.html#app.locals
application(app)... methods
*/
