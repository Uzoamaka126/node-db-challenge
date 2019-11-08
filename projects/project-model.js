const db = require('../data/db-config');

module.exports = {
    getByProjectId,
    getByResourceId,
    getProjects,
    getResources,
    addProject,
    addResource
};

function getResources() {
    return db('resources');
}

function getByResourceId(id) {
    return db('resources')
    .where({ id })
    .first()
}

function getByProjectId(id) {
    return db('projects')
    .where({ id })
    .first()
}

function addResource(resource) {
    return db('resources')
        .insert(resource)
        .then((ids => {
            return getByResourceId((ids[0]))
        }));
}

function getProjects() {
    return db('projects')
};

function addProject(project) {
    return db('projects')
        .insert(project)
        .then((ids => {
            return getByProjectId((ids[0]))
        }));
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
