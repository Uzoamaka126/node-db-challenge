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
    .where({ id })
    .first()
}

function addProject(project) {
    return db('projects')
        .insert(project)
        .then(ids => ({ id: ids[0] }))
}
