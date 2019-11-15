const express = require('express');
const router = express();
const Tasks = require('./tasks-model');
const Projects = require('../projects/project-model');

// router.get('/:id/tasks', (req, res) => {
//     // try {
//         Tasks.getProjectTasks(req.query)
//             .then(tasks => {
//                 let loopedTasks = tasks;
//                 loopedTasks.forEach(task => {
//                     task.completed = Boolean(Number(task.completed))
//                 });
//                 res.status(200).json(loopedTasks);
//             })
//             .catch(error => {
//                 console.log(error);
//                 res.status(500).json({
//                     message: 'Error retrieving tasks',
//                 })
//             })
//     // }
// })

router.get('/:id/tasks', (req, res) => {
    // try {
        Tasks.getProjectTasks(req.query)
            .then(tasks => {
                console.log(req)
                console.log(tasks)
                let loopedTasks = tasks;
                loopedTasks.forEach(task => {
                    task.completed = Boolean(Number(task.completed))
                });
                if(loopedTasks.length > 0) {
                    res.status(200).json(loopedTasks);
                } else {
                    res.status(404).json({
                        message: 'Tasks not found'
                    })
                }
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({
                    message: 'Error retrieving tasks',
                })
            })
    // }
})

 // Add a new task provided that the project id is valid
router.post('/', validateProjectId, (req, res) => {
    Tasks.addTask(req.body)
        .then(data => {
            console.log(data);
            res.status(201).json({
                message: 'New comment successfully added',
                data
            });
        })
        .catch(err => {
            // log error to the database
            console.log(err);
            res.status(500).json({
                message: 'An error occured when adding a new comment',
            });
        });
})




function validateProjectId(req, res, next) {
    const { id } = req.params;
    Projects.findById(id)
        .then(project => {
            if(project) {
                req.project = project;
                next()
            } else {
                res.status(400).json({
                    message: 'Invalid post id'
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'Something came up when we were checking for the post id' + error.message,
            });
        });
}

module.exports = router;