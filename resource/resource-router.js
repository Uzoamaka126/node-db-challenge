const express = require('express');
const router = express();
const Resources = require('./resource-model');

// Get all resources
router.get('/', (req, res) => {
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

router.get('/:id', (req, res) => {
    Resources.getByResourceId(req.params.id)
        .then(singleResource => {
            if(singleResource) {
                res.status(200).json(singleResource);
            } else {
                res.status(404).json({
                    message: 'Recipe not found'
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Recipe could not be retrieved',
            });
        });
})

// Add a new resource
router.post('/', validateResourceId, (req, res) => {
    const newResource = {
       name: req.body.name,
       description: req.body.description
   };

   Resources.addResource(newResource)
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