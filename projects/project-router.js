const express = require('express');
const router = express();
const Projects = require('./project-model');

// Get all projects
router.get('/', (req, res) => {
    Projects.getProjects(req.query)
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'Error retrieving blog posts',
            });
        })
})

// Add a new project
router.post('/', (req, res) => {
    const newProject = {
       title: req.body.title,
       name: req.body.name,
       description: req.body.description,
       // boolean:         
   };

   Projects.addProject(newProject)
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

// // Get all tasks from a particular project

// router.get('/:id/tasks', validateProjectId, (req, res) => {
//     const { id } = req.params;
//     Projects.getProjectTasks(id)
//         .then(singleTask => {
//             console.log(singleTask)
//             if (singleTask.length > 0) {
//                 res.status(200).json(singleTask);
//             } else {
//                 res.status(404).json({
//                     message: 'Post not found'
//                 });
//             }   
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 message: 'Error retrieving tasks',
//             });
//         });
// });
// // Add a new task provided that the project id is valid
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