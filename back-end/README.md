## Available Scripts

In the back-end directory, you can run:

### `npm start`

Runs the app in the development mode.

## Environment variables

You will need to add a .env file to the back-end root and add the following environment variables:

- MONGODB_URI = <connection_string>
- PORT = <port_number>

The MONGODB_URI comes from the mongoDB website setup.
Connect to a cluster, click drivers, and then copy the connection string into above
See link: https://www.mongodb.com/docs/mongodb-vscode/connect/

The port number will be whichever local port you'd like to use for development.
