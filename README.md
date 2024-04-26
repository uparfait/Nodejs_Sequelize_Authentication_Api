# Authentication API

This Authentication API is built using Node.js, Sequelize, MySQL, and Express.js. It provides endpoints for user authentication, including registration and login.

## Features

- User registration with email and password and other fields
- User login with email or telephone and password
- JWT-based authentication
- Secure password hashing using bcrypt

## Installation

To install and run this API locally, follow these steps:

1. Clone this repository:

   ```bash git clone https://github.com/uparfait/Nodejs_Sequelize_Authentication_Api.git
Install dependencies:
bash
Copy code
cd authentication-api
npm install
Start the server:
bash
Copy code
npm start
The API will be available at http://localhost:2024.
Endpoints
POST /register: Register a new user. Requires email and password in the request body.
POST /login: Login with an existing user. Requires email and password in the request body.
Environment Variables
The following environment variables are used:

DB_HOST: MySQL database host
DB_USER: MySQL database username
DB_PASSWORD: MySQL database password
DB_NAME: MySQL database name
JWT_SECRET: Secret key for JWT token generation

# Author 

```Parfait Uwayo```

### Email: parfaituwayo@gmail.com
# License

This project is licensed under the MIT License.