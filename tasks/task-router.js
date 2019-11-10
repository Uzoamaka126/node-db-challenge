const express = require('express');
const router = express();
const Tasks = require('./tasks-model');

router.get('/', (req, res) => {
    // try {
        Tasks.getProjectTasks(req.query)
            .then(tasks => {
                let loopedTasks = tasks;
                loopedTasks.forEach(task => {
                    task.completed = Boolean(Number(task.completed))
                });
                res.status(200).json(loopedTasks);
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
// router.post('/:id/task', (req, res) => {
//      const newProject = {
//         title: req.body.title,
//         name: req.body.name,
//         description: req.body.description,
//         // boolean:         
//     };

//     Projects.addTask(req.body)
//         .then(data => {
//             console.log(data);
//             res.status(201).json({
//                 message: 'New comment successfully added',
//                 data
//             });
//         })
//         .catch(err => {
//             // log error to the database
//             console.log(err);
//             res.status(500).json({
//                 message: 'An error occured when adding a new comment',
//             });
//         });
// })

module.exports = router;