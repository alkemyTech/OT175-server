'use strict';

module.exports = {
    async up (queryInterface, Sequelize) {
      await queryInterface.createTable('Slides', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          imageurl: {
              type: DataTypes.STRING
            },
          text: {
            type: DataTypes.STRING
          },
          order: {
            type: DataTypes.TEXT
          },
          organizationid: {
            type: DataTypes.INTEGER
          },
          createdAt: {
            type: DataTypes.DATE
          },
          updatedAt: {
            type: DataTypes.DATE
          },
          deletedAt: {
            type: DataTypes.DATE
        },
      });
    },
  
    async down (queryInterface, Sequelize) {
      await queryInterface.dropTable('Slides');
    }
  };