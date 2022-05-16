require('dotenv').config();
const chai= require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon')

const expect = chai.expect;

const app = require('../app');
const UserController = require('../controllers/userControllers')


chai.use(chaiHttp)

describe('Testing users ...', ()=>{
    const testUserList=[
        {
            "id": 1,
            "firstName": "Usuario01",
            "lastName": "Demo02",
            "email": "test02@test.com",
            "image": "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png",
            "password": "$2b$08$U8grRt9m326yvjsIOILZ9.6PwPC2.fVI4Z.4gr2gcWhyQptzndvAa",
            "roleId": 1,
            "deletedAt": null,
            "createdAt": "2022-05-11T15:42:08.000Z",
            "updatedAt": "2022-05-11T15:42:08.000Z"
        },
        {
            "id": 2,
            "firstName": "Usuario02",
            "lastName": "Demo03",
            "email": "test03@test.com",
            "image": "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png",
            "password": "$2b$08$U8grRt9m326yvjsIOILZ9.6PwPC2.fVI4Z.4gr2gcWhyQptzndvAa",
            "roleId": 1,
            "deletedAt": null,
            "createdAt": "2022-05-11T15:42:08.000Z",
            "updatedAt": "2022-05-11T15:42:08.000Z"
        },
        {
            "id": 3,
            "firstName": "Usuario03",
            "lastName": "Demo04",
            "email": "test04@test.com",
            "image": "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png",
            "password": "$2b$08$U8grRt9m326yvjsIOILZ9.6PwPC2.fVI4Z.4gr2gcWhyQptzndvAa",
            "roleId": 1,
            "deletedAt": null,
            "createdAt": "2022-05-11T15:42:08.000Z",
            "updatedAt": "2022-05-11T15:42:08.000Z"
        }
    ];

    const rndId = Math.floor(Math.random() * testUserList.length);

    beforeEach(() => {
        // status = sinon.stub();
        // json = sinon.spy();
        // res = { json, status };
        // status.returns(res);
    });
    
    afterEach(()=> { 
        sinon.verifyAndRestore(); 
    });


    it('GET/users ... ', (done)=>{
        let stub = sinon.stub(UserController, 'getUsers');
        stub.returns(testUserList);
        let fn = UserController.getUsers()
        // expect(status.args[0][0]).to.equal(200);
        expect(fn).to.be.an('array');
        for(each of fn) {
            expect(each).to.have.all.keys(
                `id`,
                `firstName`,
                `lastName`,
                `email`,
                `image`,
                `password`,
                `roleId`,
                `deletedAt`,
                `createdAt`,
                `updatedAt`);
        }
        done();
    });
    it(`GET/users/${rndId} ... `, (done)=>{
        let stub = sinon.stub(UserController, 'getUserById');
        stub.withArgs(rndId).returns(testUserList[rndId]);
        let fn = UserController.getUserById(rndId)
        // expect(res.status).to.be.equal(200);
        expect(fn).to.be.an('object');
        expect(fn).to.have.all.keys(
            `id`,
            `firstName`,
            `lastName`,
            `email`,
            `image`,
            `password`,
            `roleId`,
            `deletedAt`,
            `createdAt`,
            `updatedAt`);
        done();
});
    it(`PUT/users/${rndId} ... `, (done)=>{
        let stub = sinon.stub(UserController, 'updateUser');
        let req = {
            'firstName':"lala",
            'lastName':"lastname",
            'email': "email@gmail.com",
            'photo': "img.com",
            'password': "1234",
            'roleId': 1,
        }
        stub.withArgs(rndId, req).returns([1]);
        let fn = UserController.updateUser(rndId, req)
        // expect(res.status).to.be.equal(200);
        expect(fn).to.be.an('array')
        expect(fn).to.contain(1)
        done();
    });
    it('delete my user ... ', (done)=>{
        let stub = sinon.stub(UserController, 'deleteUser');
        stub.withArgs(rndId).returns({'msge': 'The user has been successfully deleted'})
        let fn = UserController.deleteUser(rndId)
        expect(fn).to.be.an('object');
        expect(fn).to.have.property( 'msge', 'The user has been successfully deleted')
        done();
    });
    it('patch user ... ', (done)=>{
        let stub = sinon.stub(UserController, 'updateUser');
        let req = {
            'firstName':"lala",
            'lastName':"lastname",
            'email': "email@gmail.com",
            'photo': "img.com",
            'password': "1234",
            'roleId': 1,
        }
        stub.withArgs(rndId, req).returns({'Updated records: ':  1 });
        let fn = UserController.updateUser(rndId, req);
        // expect(res.status).to.be.equal(200);
        expect(fn).to.be.an('object');
        expect(fn).to.have.property('Updated records: ', 1)
        done();
    });
})