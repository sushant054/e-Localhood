const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '0115',//use your mysql database password here
    database: 'registration',
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Unable to connect to MySQL:', err);
        process.exit(1);
    }
    console.log('Connected to MySQL');
});

module.exports = db;
//to check database connectd or not...type this node database.js on terminal....