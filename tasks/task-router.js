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


module.exports = router;