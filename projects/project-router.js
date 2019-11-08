const express = require('express');
const router = express();
const Projects = require('./project-model');
const Resources = require('./resource-model');

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

// Get all tasks from a particular project

router.get('/:id/tasks', (req, res) => {
    const { id } = req.params;
    Projects.getProjectTasks(id)
        .then(singleTask => {
            if (singleTask.length > 0) {
                res.status(200).json(singleTask);
            } else {
                res.status(404).json({
                    message: 'Post not found'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Error retrieving comments',
            });
        });
});
// Add a new task provided that the project id is valid
router.post('/:id/task', (req, res) => {
     const newProject = {
        title: req.body.title,
        name: req.body.name,
        description: req.body.description,
        // boolean:         
    };

    Projects.addTask(req.body)
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

// Get all resources
router.get('/resources', (req, res) => {
    Resources.findResources(req.query)
        .then(resources => {
            res.status(200).json(resources);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'Error retrieving blog posts',
            });
        })
})

// Add a new resource
router.post('/', validateResourceId, (req, res) => {
    const newResource = {
       name: req.body.name,
       description: req.body.description,
       // boolean:         
   };

   Resources.addProject(newResource)
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

function validateResourceId(req, res, next) {
    const { id } = req.params;
    Resources.getByResourceId(id)
        .then(resource => {
            if(resource) {
                req.resource = resource;
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