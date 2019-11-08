
exports.seed = function(knex) {
  // Deletes ALL existing entries
      // Inserts seed entries
      return knex('projects').insert([
        { 
          project_name: 'Food App', 
          description: 'A food app for new recipes'
        },
        { 
          project_name: 'New Health Service', 
          description: 'A new health service for the poor'
        },
      ]);
};
