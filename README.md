# chaton-backend
[![Express Logo](https://i.cloudup.com/zfY6lL7eFa-3000x3000.png)](http://expressjs.com/)

# Getting started

To get the Express server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- `npm seed` add default group in the mongoose
- `npm start` to start the local server


# Code Overview

## Dependencies

- [express](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [bcrypt]() - Lib to help you hash passwords.
- [cors]() - A node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
- [express-validator]() - An express.js middleware for validator.
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - For generating JWTs used by authentication
- [mongoose](https://github.com/Automattic/mongoose) - For modeling and mapping MongoDB data to javascript 
- [mongoose-seed]() - mongoose-seed lets you populate and clear MongoDB documents with all the benefits of Mongoose validation
- [node-where]() - A basic geolocation library for node.js.
- [socket.io]() - Socket.IO enables real-time bidirectional event-based communication.


## Application Structure

- `app.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also requires the routes and models we'll be using in the application.
- `config/` - This folder contains configuration for passport as well as a central location for configuration/environment variables.
- `seeder.js/` - This folder contains the seed definitions for our Mongoose models.
- `controllers/` - This folder contains the controllers definitions for our systen.
- `middleware/` - This folder contains the middleware definitions for our system.
- `socket/` - This folder contains the socket definitions for chat server.
- `routes/` - This folder contains the route definitions for our system.
- `models/` - This folder contains the schema definitions for our Mongoose models.

## Error Handling
We define a error-handling middleware for handling all request.
## Authentication

Requests are authenticated using the `Authorization` header with a valid JWT. We define two express middlewares in `middleware/auth.js` that can be used to authenticate requests. The `required` middleware configures the `express-jwt` middleware using our application's secret and will return a 401 status code if the request cannot be authenticated. The payload of the JWT can then be accessed from `req.payload` in the endpoint. The `optional` middleware configures the `express-jwt` in the same way as `required`, but will *not* return a 401 status code if the request cannot be authenticated.
