
exports.seed = function(knex) {
  // Deletes ALL existing entries
      // Inserts seed entries
      return knex('projects_and_resources').insert([
        {
          project_id: 1, 
          resource_id: 1
        },
        {
          project_id: 1, 
          resource_id: 2
        },
        {
          project_id: 1, 
          resource_id: 3
        }
      ]);
};
