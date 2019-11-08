const express = require('express');
const router = express();
const Projects = require('./project-model');
const Resources = require('./resource-model');

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

router.post('/:id/task', (req, res) => {
     const newProject = {
        title: req.body.title,
        name: req.body.name,
        description: req.body.description,
        // boolean:         
    };

    Projects.addProject(req.body)
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

// Add new Task
router.post('/:id/task', validateProjectId,  (req, res) => {
    const newTask = {
       title: req.body.title,
       name: req.body.name,
       description: req.body.description,
       notes: req.body.notes         
   };

   Projects.addProject(newTask)
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