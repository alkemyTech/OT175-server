'use strict';

//Clear password is 'Abc123'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          firstName: 'Usuario01',
          lastName: 'Demo01',
          email: 'test01@test.com',
          password:
            '$2b$08$U8grRt9m326yvjsIOILZ9.6PwPC2.fVI4Z.4gr2gcWhyQptzndvAa',
          roleId: 1,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date()
        },

        {
          firstName: 'Usuario02',
          lastName: 'Demo02',
          email: 'test02@test.com',
          password:
            '$2b$08$U8grRt9m326yvjsIOILZ9.6PwPC2.fVI4Z.4gr2gcWhyQptzndvAa',
          roleId: 1,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'Usuario03',
          lastName: 'Demo03',
          email: 'test03@test.com',
          password:
            '$2b$08$U8grRt9m326yvjsIOILZ9.6PwPC2.fVI4Z.4gr2gcWhyQptzndvAa',
          roleId: 1,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'Usuario04',
          lastName: 'Demo04',
          email: 'test04@test.com',
          password:
            '$2b$08$U8grRt9m326yvjsIOILZ9.6PwPC2.fVI4Z.4gr2gcWhyQptzndvAa',
          roleId: 1,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'Usuario05',
          lastName: 'Demo05',
          email: 'test05@test.com',
          password:
            '$2b$08$U8grRt9m326yvjsIOILZ9.6PwPC2.fVI4Z.4gr2gcWhyQptzndvAa',
          roleId: 1,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'Usuario06',
          lastName: 'Demo06',
          email: 'test06@test.com',
          password:
            '$2b$08$U8grRt9m326yvjsIOILZ9.6PwPC2.fVI4Z.4gr2gcWhyQptzndvAa',
          roleId: 1,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'Usuario07',
          lastName: 'Demo07',
          email: 'test07@test.com',
          password:
            '$2b$08$U8grRt9m326yvjsIOILZ9.6PwPC2.fVI4Z.4gr2gcWhyQptzndvAa',
          roleId: 1,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'Usuario08',
          lastName: 'Demo08',
          email: 'test08@test.com',
          password:
            '$2b$08$U8grRt9m326yvjsIOILZ9.6PwPC2.fVI4Z.4gr2gcWhyQptzndvAa',
          roleId: 1,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'Usuario09',
          lastName: 'Demo09',
          email: 'test09@test.com',
          password:
            '$2b$08$U8grRt9m326yvjsIOILZ9.6PwPC2.fVI4Z.4gr2gcWhyQptzndvAa',
          roleId: 1,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'Usuario10',
          lastName: 'Demo10',
          email: 'test10@test.com',
          password:
            '$2b$08$U8grRt9m326yvjsIOILZ9.6PwPC2.fVI4Z.4gr2gcWhyQptzndvAa',
          roleId: 1,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'Usuario11',
          lastName: 'Demo11',
          email: 'test11@test.com',
          password:
            '$2b$08$U8grRt9m326yvjsIOILZ9.6PwPC2.fVI4Z.4gr2gcWhyQptzndvAa',
          roleId: 2,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'Usuario12',
          lastName: 'Demo12',
          email: 'test12@test.com',
          password:
            '$2b$08$U8grRt9m326yvjsIOILZ9.6PwPC2.fVI4Z.4gr2gcWhyQptzndvAa',
          roleId: 2,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'Usuario13',
          lastName: 'Demo13',
          email: 'test13@test.com',
          password:
            '$2b$08$U8grRt9m326yvjsIOILZ9.6PwPC2.fVI4Z.4gr2gcWhyQptzndvAa',
          roleId: 2,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'Usuario14',
          lastName: 'Demo14',
          email: 'test14@test.com',
          password:
            '$2b$08$U8grRt9m326yvjsIOILZ9.6PwPC2.fVI4Z.4gr2gcWhyQptzndvAa',
          roleId: 2,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'Usuario15',
          lastName: 'Demo15',
          email: 'test15@test.com',
          password:
            '$2b$08$U8grRt9m326yvjsIOILZ9.6PwPC2.fVI4Z.4gr2gcWhyQptzndvAa',
          roleId: 2,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'Usuario16',
          lastName: 'Demo16',
          email: 'test16@test.com',
          password:
            '$2b$08$U8grRt9m326yvjsIOILZ9.6PwPC2.fVI4Z.4gr2gcWhyQptzndvAa',
          roleId: 2,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'Usuario17',
          lastName: 'Demo17',
          email: 'test17@test.com',
          password:
            '$2b$08$U8grRt9m326yvjsIOILZ9.6PwPC2.fVI4Z.4gr2gcWhyQptzndvAa',
          roleId: 2,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'Usuario18',
          lastName: 'Demo18',
          email: 'test18@test.com',
          password:
            '$2b$08$U8grRt9m326yvjsIOILZ9.6PwPC2.fVI4Z.4gr2gcWhyQptzndvAa',
          roleId: 2,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'Usuario19',
          lastName: 'Demo19',
          email: 'test19@test.com',
          password:
            '$2b$08$U8grRt9m326yvjsIOILZ9.6PwPC2.fVI4Z.4gr2gcWhyQptzndvAa',
          roleId: 2,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'Usuario20',
          lastName: 'Demo20',
          email: 'test20@test.com',
          password:
            '$2b$08$U8grRt9m326yvjsIOILZ9.6PwPC2.fVI4Z.4gr2gcWhyQptzndvAa',
          roleId: 2,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
