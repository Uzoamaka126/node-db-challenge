const express = require('express');
const router = require('./projects/project-router');
const server = express();
const cors = require('cors');

server.use(express.json());
server.use(cors());

server.use('/api/projects', router);
server.use('/', (req, res) => {
    res.send('Welcome!');
});

module.exports = server;