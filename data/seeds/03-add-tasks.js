
exports.seed = function(knex) {
  // Deletes ALL existing entries
      // Inserts seed entries
      return knex('task').insert([
        {
          description: 'Design the app', 
          notes: 'This is note 1',
          project_id: 1
        },
        {
          description: 'Demo the app', 
          notes: 'This is note 2',
          project_id: 1
        },
        {
          description: 'Get feedback on the app', 
          notes: 'This is note 3',
          project_id: 1
        }
      ]);
};
