const db = require('../data/db-config');

module.exports = {
    getProjectTasks,
    getTasksByProjectId,
    addTask
}

// function getProjectTasks(id) {
//     return db('task as t')
//         .join('projects as p', 'p.id', 't.project_id')
//         .select('t.id', 'p.project_name', 't.notes', 't.description', 't.completed')
//         .where('p.id', id)
// }

function getProjectTasks(id) {
    return db('task as t')
        .join('projects as p', 't.project_id',  'p.id')
        .select('p.description', 'p.project_name', 't.completed')
        .where('p.id', id)
}

function getTasksByProjectId(projectId) {
    return db('task as t')
    .join('projects as p', 'p.id', 't.project_id')
    .select('t.description', 't.notes', 'p.description')
    .where('t.project_id', projectId);
}

function addTask(singleTask) {
    return db('task')
        .insert(singleTask)
        .then(ids => ({ id: ids[0]}));
}