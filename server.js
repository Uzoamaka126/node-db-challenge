const express = require('express');
const projectRouter = require('./projects/project-router');
const taskRouter = require('./tasks/task-router');
const resourceRouter = require('./resource/resource-router');

const server = express();
const cors = require('cors');

server.use(express.json());
server.use(cors());

server.use('/api/projects', projectRouter);
server.use('/api/tasks', taskRouter);
server.use('/api/resources', resourceRouter);

server.use('/', (req, res) => {
    res.send('Welcome!');
});

module.exports = server;