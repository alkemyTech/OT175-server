'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Posts', [{
      title: 'Title post 1',
      body: 'facebook.com/María_Irola',
      image: 'https://res.cloudinary.com/dggzhar2j/image/upload/v1649968636/Mar%C3%ADa_Irola_eqgvwu.jpg',
      userId: 1,
      createdAt: new Date,
      updatedAt: new Date
    }], {});

    await queryInterface.bulkInsert('Posts', [{
      title: 'Title post 2',
      body: 'facebook.com/María_Irola',
      image: 'https://res.cloudinary.com/dggzhar2j/image/upload/v1649968636/Mar%C3%ADa_Irola_eqgvwu.jpg',
      userId: 1,
      createdAt: new Date,
      updatedAt: new Date
    }], {});

    await queryInterface.bulkInsert('Posts', [{
      title: 'Title post 3',
      body: 'facebook.com/María_Irola',
      image: 'https://res.cloudinary.com/dggzhar2j/image/upload/v1649968636/Mar%C3%ADa_Irola_eqgvwu.jpg',
      userId: 1,
      createdAt: new Date,
      updatedAt: new Date
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Posts', null, {});
  }
};
