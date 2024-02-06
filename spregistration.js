const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database'); // here we..import MySQL database connection

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Endpoint for Service Provider Registration
app.post('/v1/spregistration', (req, res) => {
    const { YourStoreName, Pincode, City, State, Address } = req.body;

    // Check if required fields are present in the request body
    if (!YourStoreName || !Pincode || !City || !State) {
        return res.status(400).json({ error: 'Invalid Registration Information' });
    }

    // Perform registration logic here (e.g., save to database)
    const query = 'INSERT INTO service_providers (store_name, pincode, city, state) VALUES (?, ?, ?, ?)';
    const values = [YourStoreName, Pincode, City, State];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error inserting data into MySQL:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        
        const provider_id = result.insertId; // Get the inserted provider ID
        res.status(200).json({ provider_id, store_name: YourStoreName });
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
