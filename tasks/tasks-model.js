const db = require('../data/db-config');

module.exports = {
    getProjectTasks,
    getTasksById,
    addTask
}

function getProjectTasks() {
    return db('task as t')
        .join('projects as p', 'p.id', 't.project_id')
        .select('t.id', 'p.project_name', 't.notes', 't.description', 't.completed')
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