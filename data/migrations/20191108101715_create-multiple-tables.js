
exports.up = function(knex) {
  return knex.schema
    .createTable('projects', table => {
        table.increments()
        table.string('project_name', 200).notNullable()
        table.string('description', 200)
        table
            .boolean('completed')
            .notNullable()
            .default(false)
    })
    .createTable('task', table => {
        table.increments()
        table
            .string('description', 200)
            .notNullable()
        table.string('notes', 200)
        table
            .boolean('completed')
            .notNullable()
            .default(false)
        table
            .integer('project_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('projects')
    })
    .createTable('resources', table => {
        table.increments()
        table.string('name', 150).notNullable()
        table.string('description', 200)
    })
    .createTable('projects_and_resources', table => {
        table.increments()
        table
            .integer('project_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('projects')    
        table
            .integer('resource_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('resources')    
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('projects_and_resources')
    .dropTableIfExists('resources')
    .dropTableIfExists('task')
    .dropTableIfExists('projects')
};
