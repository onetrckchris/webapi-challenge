const express = require('express');
const choresRouter = require('./chores/chores-router');
const peopleRouter = require('./people/people-router');

const server = express();

const logger = (req, res, next) => {
    console.log(`A ${req.method} request was made to ${req.url}...`);
    if(Object.keys(req.query).length !== 0) {
        console.log("Here are the queries inside of the request: ", req.query);
    }

    next();
};

server.use(express.json());
server.use(logger);
server.use('/people/chores', choresRouter);
server.use('/people', peopleRouter);

const port = process.env.PORT || 8000;
server.listen(port, console.log(`\nServer running on port ${port}...`));