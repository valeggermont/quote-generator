# Quote Generator - Valentin Eggermont

This project is a sample quote Generator API and application written in Node.js and React

## How to setup the project

Run the following command :

```
npm install
```

Create a `.env` file based on ´env.example` :

- _QUOTE_API_BASE_URL_ : URL to Quote API
- _TEST_USERNAME_ : Username to use to login to the application
- _TEST_PASSWORD_HASH_ : Hash of the password to use to login to the application. The password is encrypted using bcrypt. You can get the hash of a password using https://bcrypt-generator.com

## How to build and start the project

Run the following command :

```
npm run build
```

You can then start the Node server on http://localhost:3000/ (You can override port number by defining PORT on .env file) by running `npm start`

The application is running directly on http://localhost:3000/.

## How to start project as dev

The project is using webpack for the React part and Nodemon for the Node.js part. By running `npm start:dev`, webpack will build the application in watch mode and Nodemon will restart the Node server for each change. This way, developer don't need to stop and restart script when applying change on the Node or React part

## How to start project as docker container

Make sure you have Docker installed and run following command:

```
docker-compose up -d
```

The docker-compose exposte the app on the port 4000 instead.

## Code quality

The project has Jest setup for the test and Esling for code for code quality check. 

To run the tests, run `npm run test`. Jest has been setup to automatically check for 100% coverage on statements, lines and branch, except for the models, index.ts and app.ts. The tests are considered failed if the coverage required is not met.

To run Eslint checker, run `npm run lint`. Some rules can be automatically fixed. In order to fix fixables errors and warnings, just run `npm run lint:fix`. 

