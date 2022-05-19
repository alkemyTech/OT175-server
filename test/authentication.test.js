const { expect } = require('chai');
const sinon = require("sinon");
const jwt = require("jsonwebtoken");

const models = require('../models');
const {  User, Role } = models;

const AuthControllers = require('../controllers/authControllers');
const welcomeMail = require("../services/welcomeMail");

describe('Testing users  ...', ()=>{
    const testUserList=[
        {
            "id": 1,
            "firstName": "Usuario01",
            "lastName": "Demo02",
            "email": "test01@test.com",
            "image": "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png",
            "password": "$2b$08$/FPf4u.c.flcDSqFB2xvBuvS0s6xTsVW0d1CBGj5PbRc3hM2O8rjS",
            "roleId": 1,
            "deletedAt": null,
            "createdAt": "2022-05-11T15:42:08.000Z",
            "updatedAt": "2022-05-11T15:42:08.000Z",
            "realPassword": "testpassword"
        },
        {
            "id": 2,
            "firstName": "Usuario02",
            "lastName": "Demo03",
            "email": "test03@test.com",
            "image": "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png",
            "password": "$2b$08$/FPf4u.c.flcDSqFB2xvBuvS0s6xTsVW0d1CBGj5PbRc3hM2O8rjS",
            "roleId": 1,
            "deletedAt": null,
            "createdAt": "2022-05-11T15:42:08.000Z",
            "updatedAt": "2022-05-11T15:42:08.000Z",
            "realPassword": "testpassword"
        },
        {
            "id": 3,
            "firstName": "Usuario03",
            "lastName": "Demo04",
            "email": "test04@test.com",
            "image": "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png",
            "password": "$2b$08$/FPf4u.c.flcDSqFB2xvBuvS0s6xTsVW0d1CBGj5PbRc3hM2O8rjS",
            "roleId": 1,
            "deletedAt": null,
            "createdAt": "2022-05-11T15:42:08.000Z",
            "updatedAt": "2022-05-11T15:42:08.000Z",
            "realPassword": "testpassword"
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
    describe('Testing auth (success cases)...', ()=>{
        it('signin',async()=>{
            req = {
                body:{ 
                    "firstName": "New User",
                    "lastName": "Not real",
                    "email": "testing@test.com",
                    "image": "image.png",
                    "password": "12345"
                }
            };
            let newUser ={
                dataValues:{
                    ...req.body,
                    id: testUserList.length + 1,
                    roleId: 2
                }
            };
            let stubCreate = sinon.stub(User, 'create')
                .returns(newUser);
            let stubMail = sinon.stub(welcomeMail, 'sendWelcomeMail')
                .returns(true);
            let stubToken = sinon.stub(jwt, 'sign')
                .returns('token');
            await AuthControllers.signin(req, res)
            expect(stubCreate.calledOnce).to.be.true;
            expect(stubMail.calledOnce).to.be.true;
            expect(stubToken.calledOnce).to.be.true;
            expect(json.calledWith({
                ...newUser.dataValues,
                token: 'token'
                }
            )).to.be.true;
            expect(status.calledWith(200)).to.be.true;
        });
        it('getDataUser', async()=>{
            req = {
                headers: {authorization: 'Bearer token'},
            };
            let decodedPayload ={
                    id: rndId,
                    roleId: 2 
            };
            let stubToken = sinon.stub(jwt, 'verify')
                .returns(decodedPayload);
            let stub = sinon.stub(User, 'findOne')
                .returns(testUserList[decodedPayload.id]);
            await AuthControllers.getDataUser(req, res)
            expect(stubToken.calledOnce).to.be.true;
            expect(stub.calledOnce).to.be.true;
            expect(json.calledWith(testUserList[decodedPayload.id]));
            expect(status.calledWith(200)).to.be.true;
        });
        it(`login/${rndId}`, async()=>{
            let targetUser = testUserList[rndId]
            req = {
                body:{ 
                    "email": targetUser.email,
                    "password": targetUser.realPassword
                }
            };
            let stub = sinon.stub(User, 'findOne')
                .returns(targetUser);
            let stubToken = sinon.stub(jwt, 'sign')
                .returns('token');
            await AuthControllers.login(req, res)
            expect(stub.calledOnce).to.be.true;
            expect(stubToken.calledOnce).to.be.true;
            expect(json.calledWith('token')).to.be.true;
            expect(status.calledWith(200)).to.be.true
        })
    });
    describe('Testing auth (failing cases)...', ()=>{
        it('signin (reapeted email)',async()=>{
            let ExistingUser = testUserList[rndId]
            req = {
                body:{ 
                    "firstName": "New User",
                    "lastName": "Not real",
                    "email": ExistingUser.email,
                    "image": "image.png",
                    "password": "12345"
                }
            };
            let stubCreate = sinon.stub(User, 'create')
                .returns(null);
            let stubMail = sinon.stub(welcomeMail, 'sendWelcomeMail')
                .returns(new Error('email must be unique'));
            let stubToken = sinon.stub(jwt, 'sign')
                .returns('token');
            let next = sinon.stub()
            await AuthControllers.signin(req, res, next)
            expect(stubCreate.calledOnce).to.be.true;
            expect(stubMail.calledOnce).to.be.true;
            expect(stubToken.notCalled).to.be.true;
            expect(next.calledOnce).to.be.true
            
            const errArg = next.firstCall.args[0];
            expect(errArg).to.be.instanceof(Error);
            expect(errArg.message).to.equal('email must be unique')
            expect(errArg.status(500)).to.be.true;
        });
    });
});