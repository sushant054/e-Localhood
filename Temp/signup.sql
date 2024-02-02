CREATE DATABASE IF NOT EXISTS registration;

USE registration;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);
-- this is temporary database 



--input that we will give to postman in (json) body/object:-
for registration->(firstly run signup.js on terminal....like node signup.js)
{
    "Name": "sushant",
    "PhoneNumber": "7758007166",
    "Password": "psw",
    "Email": "sushantnalage@gmail.com"
}
for login ->(firstly run login.js on terminal....like node login.js)
{
    "Email": "sushantnalage@gmail.com",
    "Password": "psw"
}

