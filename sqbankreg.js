const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database'); // Import MySQL database connection

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Endpoint for Service Provider Registration with Bank Account Details
app.post('/v1/sqbankreg', (req, res) => {
    const { BankAccDetails } = req.body;

    // Check if required fields are present in the request body
    if (!BankAccDetails || !BankAccDetails.Name || !BankAccDetails.AccNumber || !BankAccDetails["Re-enterAccNumber"] || !BankAccDetails.IFSCCode) {
        return res.status(400).json({ error: 'Invalid Registration Information' });
    }

    // Validate if both account numbers match
    if (BankAccDetails.AccNumber !== BankAccDetails["Re-enterAccNumber"]) {
        return res.status(400).json({ error: 'Account numbers do not match' });
    }

    // Perform registration logic here (e.g., save to database)
    const query = 'INSERT INTO service_providers (acc_holder_name, bank_acc_number, ifsc_code) VALUES (?, ?, ?)';
    const values = [BankAccDetails.Name, BankAccDetails.AccNumber, BankAccDetails.IFSCCode];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error inserting data into MySQL:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        
        const provider_id = result.insertId; // Get the inserted provider ID
        res.status(200).json({ provider_id, store_name: 'string' }); // Assuming store name is not provided in this endpoint
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
