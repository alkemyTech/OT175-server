require('dotenv').config();
const chai= require('chai');
const sinon = require('sinon')

const expect = chai.expect;

const UserController = require('../controllers/userControllers');
const models = require('../models');
const { User } = models;

describe('Testing users  ...', ()=>{
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
    const invalidId = testUserList.length + 1;
    let req = {};
    let status, json, res ;
    beforeEach(() => {
        status = sinon.stub();
        json = sinon.spy();
        res = { json, status };
        status.returns(res);
    });

    afterEach(()=> {
        sinon.verifyAndRestore();
    });

    describe('Testing users (success cases)...', ()=>{

        it('GET/users ... ', async()=>{
            let stub = sinon.stub(User, 'findAll').returns(testUserList);
            await UserController.getUsers(req, res);

            expect(stub.calledOnce).to.be.true;
            expect(status.calledWith(200)).to.be.true;
            expect(json.calledWith(testUserList)).to.be.true;
        });
        it(`GET/users/${rndId} ... `, async()=>{
            req.params ={id: rndId} 
            let stub = sinon.stub(User, 'findByPk')
                .withArgs(rndId)
                .returns(testUserList[rndId]);
            await UserController.getUserById(req, res);

            expect(stub.calledOnce).to.be.true;
            expect(status.calledWith(200)).to.be.true;
            expect(json.calledWith(testUserList[rndId])).to.be.true;
        });
        it(`PUT/users/${rndId} ... `, async()=>{
            req = {
                params: {id: rndId},
                body:{
                    'firstName':"lala",
                    'lastName':"lastname",
                    'email': "email@gmail.com",
                    'photo': "img.com",
                    'password': "1234",
                    'roleId': 1,
                }
            };
            let stub = sinon.stub(User, 'update').returns([1]);
            let stubFinder = sinon.stub(User, 'findAll').returns(testUserList[rndId]);
            await UserController.updateUser(req, res)
            expect(stub.calledOnce).to.be.true;
            expect(stubFinder.calledOnce).to.be.true;
            expect(status.calledWith(200)).to.be.true;
            expect(json.calledWith([1])).to.be.true;
        });
        it('patch user ... ', async()=>{
            req = {
                params: {id: rndId},
                body:{
                    'firstName':"lala",
                    'lastName':"lastname",
                    'email': "email@gmail.com",
                    'photo': "img.com",
                    'password': "1234",
                    'roleId': 1,
                }
            };
            let stub = sinon.stub(User, 'update').returns([1]);
            let stubFinder = sinon.stub(User, 'findByPk').withArgs(rndId).returns(testUserList[rndId]);
            await UserController.patchUser(req, res)
            expect(stub.calledOnce).to.be.true;
            expect(stubFinder.calledOnce).to.be.true;
            expect(status.calledWith(200)).to.be.true;
            expect(json.calledWith([1])).to.be.true;
        });
        it('delete my user ... ', async()=>{
            req.params= {id: rndId}
            let stub = sinon.stub(User, 'destroy').returns([1]);
            let stubFinder = sinon.stub(User, 'findAll').returns(testUserList[rndId]);
            await UserController.deleteUser(req, res)
            expect(stub.calledOnce).to.be.true;
            expect(stubFinder.calledOnce).to.be.true;
            expect(status.calledWith(200)).to.be.true;
            expect(json.calledWith({ msge: 'The user has been successfully deleted' }))
                .to.be.true;
        });
    });
    describe('Testing users (failing cases)...', ()=>{

        it(`GET/users/${invalidId} ... `, async()=>{
            req.params ={id: invalidId} 
            let stub = sinon.stub(User, 'findByPk')
                .withArgs(invalidId)
                .returns(null);
            await UserController.getUserById(req, res);

            expect(stub.calledOnce).to.be.true;
            expect(status.calledWith(404)).to.be.true;
            expect(json.calledWith({ msge: 'The query got no results. Im sory' }))
                .to.be.true;
        });
        it(`PUT/users/${invalidId} ... `, async()=>{
            req = {
                params: {id: invalidId},
                body:{
                    'firstName':"lala",
                    'lastName':"lastname",
                    'email': "email@gmail.com",
                    'photo': "img.com",
                    'password': "1234",
                    'roleId': 1,
                }
            };
            let stub = sinon.stub(User, 'update').returns([1]);
            let stubFinder = sinon.stub(User, 'findAll').returns(null);
            await UserController.updateUser(req, res)
            expect(stub.notCalled).to.be.true;
            expect(stubFinder.calledOnce).to.be.true;
            expect(status.calledWith(400)).to.be.true;
            expect(json.calledWith({ error: 'Invalid update!' })).to.be.true;
        });
        it(`PUT/users/${rndId} ... `, async()=>{
            req = {
                params: {id: rndId},
                body:{
                    'firstName':"lala",
                    'lastName':"lastname",
                    'email': "email@gmail.com",
                    'photo': "img.com",
                    'password': "1234",
                    'roleId': 1,
                    'invalidKey': true
                }
            }
        let stub = sinon.stub(User, 'update').returns([1]);
        let stubFinder = sinon.stub(User, 'findAll').returns(testUserList[rndId]);
        await UserController.updateUser(req, res)
        expect(stub.notCalled).to.be.true;
        expect(stubFinder.calledOnce).to.be.true;
        expect(status.calledWith(400)).to.be.true;
        expect(json.calledWith({ error: 'Invalid update!' })).to.be.true;
        });
        it(`PATCH/users/${invalidId} ... `, async()=>{
            req = {
                params: {id: invalidId},
                body:{
                    'firstName':"lala",
                    'lastName':"lastname",
                    'email': "email@gmail.com",
                    'photo': "img.com",
                    'password': "1234",
                    'roleId': 1,
                }
            };
            let stub = sinon.stub(User, 'update').returns([1]);
            let stubFinder = sinon.stub(User, 'findByPk').withArgs(invalidId).returns(null);
            await UserController.patchUser(req, res)
            expect(stub.notCalled).to.be.true;
            expect(stubFinder.calledOnce).to.be.true;
            expect(status.calledWith(404)).to.be.true;
            expect(json.calledWith({status: 'User not found'})).to.be.true;
        });
        it(`DELETE/users/${invalidId} ... `, async()=>{
            req.params= {id: invalidId}
            let stub = sinon.stub(User, 'destroy').returns([1]);
            let stubFinder = sinon.stub(User, 'findAll').returns(null);
            await UserController.deleteUser(req, res)
            expect(stub.notCalled).to.be.true;
            expect(stubFinder.calledOnce).to.be.true;
            expect(status.calledWith(404)).to.be.true;
            expect(json.calledWith({ msge: 'An error has occured. The user doesnt exist' }))
                .to.be.true;
        });
    });
})