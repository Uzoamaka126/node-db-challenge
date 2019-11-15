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

router.get('/:id', (req, res) => {
    Projects.findById(req.params.id)
        .then(project => {
            console.log(project)
            if(project) {     
                res.status(200).json(project);
            } else {
                res.status(404).json({
                    message: 'Post not found'
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Post could not be retrieved',
            });
        });
});

// Add a new project
router.post('/', (req, res) => {
    const newProject = {
       project_name: req.body.project_name,
       description: req.body.description,
       completed: req.body.completed
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