--tables in e_Localhood1 database
-- Table for users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    phone_number VARCHAR(20),
    password VARCHAR(255),
    email VARCHAR(255) UNIQUE
);

-- Table for service providers
CREATE TABLE service_providers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    store_name VARCHAR(255),
    pincode VARCHAR(10),
    city VARCHAR(100),
    state VARCHAR(100)
);

-- Table for service providers with bank details
CREATE TABLE service_providers_bank (
    id INT AUTO_INCREMENT PRIMARY KEY,
    acc_holder_name VARCHAR(255),
    bank_acc_number VARCHAR(50),
    ifsc_code VARCHAR(20)
);

-- input (json): 
-- login.js
-- {
--     "Email": "sushhh@gmail.com",
--     "Password": "psw123"
-- }

-- signup.js
-- {
--     "Name": "sushant",
--     "PhoneNumber": "1234567890",
--     "Password": "password123",
--     "Email": "sushhh@gmail.com"
-- }
-- spregistration.js   

-- {
--     "YourStoreName": "Example Store",
--     "Pincode": "12345",
--     "City": "CityName",
--     "State": "StateName"
-- }

-- sqbankereg.js
-- {
--     "BankAccDetails": {
--         "Name": "sushhh ",
--         "AccNumber": "1234567890",
--         "Re-enterAccNumber": "1234567890",
--         "IFSCCode": "ABC123"
--     }
-- }

