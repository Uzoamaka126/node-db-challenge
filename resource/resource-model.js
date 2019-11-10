const db = require('../data/db-config');

module.exports = {
    findResources,
    getByResourceId,
    addResource
};

function findResources() {
    return db('resources');
  }

function getByResourceId(id) {
    return db('resources')
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
