'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('Organizations', [{
      name: 'ONG-Somos Más',
      image: "image-cloudynary.com",
      address: "Av 638",
      phone: 123456,
      email: 'somosmas@gmail.com',
      welcomeText: 'Bienvendido a Somos Más',
      aboutUsText: 'Desde 1997 en Somos Más trabajamos con los chicos y chicas',
      createdAt: new Date(),
      updatedAt: new Date(),
       }]);
  },

  down: async (queryInterface, Sequelize) => {
   
     
      await queryInterface.bulkDelete('Organizations', null, {});
     
  }
}
