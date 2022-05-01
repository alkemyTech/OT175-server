'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Slides', [{
      imageUrl: "https://www.clasesdeperiodismo.com/wp-content/uploads/2015/10/twitter1.jpg",
      text: "nuestra fundación",
      order: 1,
      organizationId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
