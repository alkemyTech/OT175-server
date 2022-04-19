'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('members', [{
      name: 'María Irola',
      facebookUrl: 'facebook.com/María_Irola',
      instagramUrl: 'instagram.com/María_Irola',
      linkedinUrl: 'linkedin.com/María_Irola',
      image: 'https://res.cloudinary.com/dggzhar2j/image/upload/v1649968636/Mar%C3%ADa_Irola_eqgvwu.jpg',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
      createdAt: new Date,
      updatedAt: new Date
    }], {});

    await queryInterface.bulkInsert('members', [{
      name: 'Marita Gomez',
      facebookUrl: 'facebook.com/Marita_Gomez',
      instagramUrl: 'instagram.com/Marita_Gomez',
      linkedinUrl: 'linkedin.com/Marita_Gomez',
      image: 'https://res.cloudinary.com/dggzhar2j/image/upload/v1649968636/Marita_Gomez_japull.jpg',
      description: 'when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries',
      createdAt: new Date,
      updatedAt: new Date
    }], {});

    await queryInterface.bulkInsert('members', [{
      name: 'Rodrigo Fuente',
      facebookUrl: 'facebook.com/Rodrigo_Fuente',
      instagramUrl: 'instagram.com/Rodrigo_Fuente',
      linkedinUrl: 'linkedin.com/Rodrigo_Fuente',
      image: 'https://res.cloudinary.com/dggzhar2j/image/upload/v1649968635/Rodrigo_Fuente_t5j6fg.jpg',
      description: 'but also the leap into electronic typesetting, remaining essentially unchanged',
      createdAt: new Date,
      updatedAt: new Date
    }], {});

    await queryInterface.bulkInsert('members', [{
      name: 'María García',
      facebookUrl: 'facebook.com/María_Garcia',
      instagramUrl: 'instagram.com/María_Garcia',
      linkedinUrl: 'linkedin.com/María_Garcia',
      image: 'https://res.cloudinary.com/dggzhar2j/image/upload/v1649968635/Mar%C3%ADa_Garcia_ssyhcz.jpg',
      description: 'It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages',
      createdAt: new Date,
      updatedAt: new Date
    }], {});

    await queryInterface.bulkInsert('members', [{
      name: 'Marco Fernandez',
      facebookUrl: 'facebook.com/Marco_Fernandez',
      instagramUrl: 'instagram.com/Marco_Fernandez',
      linkedinUrl: 'linkedin.com/Marco_Fernandez',
      image: 'https://res.cloudinary.com/dggzhar2j/image/upload/v1649968635/Marco_Fernandez_fazri0.jpg',
      description: 'and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      createdAt: new Date,
      updatedAt: new Date
    }], {});

    await queryInterface.bulkInsert('members', [{
      name: 'Miriam_Rodriguez',
      facebookUrl: 'facebook.com/Miriam_Rodriguez',
      instagramUrl: 'instagram.com/Miriam_Rodriguez',
      linkedinUrl: 'linkedin.com/Miriam_Rodriguez',
      image: 'https://res.cloudinary.com/dggzhar2j/image/upload/v1649968635/Miriam_Rodriguez_rahhw9.jpg',
      description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC',
      createdAt: new Date,
      updatedAt: new Date
    }], {});

    await queryInterface.bulkInsert('members', [{
      name: 'Cecilia_Mendez',
      facebookUrl: 'facebook.com/Cecilia_Mendez',
      instagramUrl: 'instagram.com/Cecilia_Mendez',
      linkedinUrl: 'linkedin.com/Cecilia_Mendez',
      image: 'https://res.cloudinary.com/dggzhar2j/image/upload/v1649968634/Cecilia_Mendez_kmz3c4.jpg',
      description: 'a Latin professor at Hampden-Sydney College in Virginia',
      createdAt: new Date,
      updatedAt: new Date
    }], {});

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
