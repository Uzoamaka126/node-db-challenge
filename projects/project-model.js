const db = require('../data/db-config');

module.exports = {
    getProjects,
    findById,
    addProject,
    addResource
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

function addResource(resource) {
    return db('resources')
        .insert(resource)
        .then(ids => ({ id: ids[0] }))
}


function getProjectTasks(projectId) {
    return db('task')
        .join('projects', 'projects.id', 'project_id')
        .select('task.*', 'description')
        .where('project_id', projectId);
}

function getTasksById(id) {
    return db('task')
    .join('projects', 'projects.id', 'project_id')
    .select('task.*', 'description')
    .where('task.id', id);
}
function addTask(singleTask) {
    return db('task')
        .insert(singleTask)
        .then(ids => ({ id: ids[0]}));
}
