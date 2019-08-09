const express = require('express');

const server = express();

server.use(express.json());

const port = process.env.PORT || 8000;
server.listen(port, console.log(`\nServer running on port ${port}...`));