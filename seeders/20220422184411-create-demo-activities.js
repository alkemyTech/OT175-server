'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Activities', [{
      name: 'Activitie test',
      content: 'Demo for activities',
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    }], {});

    await queryInterface.bulkInsert('Activities', [{
      name: 'Activitie test 2',
      content: 'Demo for activities 2',
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    }], {});

  },

  down: async (queryInterface, Sequelize) => {
    
    
    
    
     await queryInterface.bulkDelete('People', null, {});
    
  }
};
