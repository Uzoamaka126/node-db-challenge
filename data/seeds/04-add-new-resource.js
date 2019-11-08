
exports.seed = function(knex) {
  // Deletes ALL existing entries
      // Inserts seed entries
      return knex('resources').insert([
        {
          name: 'Figma', 
          description: 'use Figma to design the app'
        },
        {
          name: 'PowerPoint', 
          description: 'Use powerpoint to demo the app'
        },
        {
          name: 'Meeting Room', 
          description: 'use the meeting room for the feedback'
        }
      ]);
};
