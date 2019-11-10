const db = require('../data/db-config');

module.exports = {
    getProjects,
    findById,
    addProject
};

function getProjects() {
    return db('projects')
}

function findById(id) {
    return db('projects')
    .where({ id: Number(id) });
}

function addProject(project) {
    return db('projects')
        .insert(project)
        .then(ids => {            
            return findById((ids[0]))
        })
}
