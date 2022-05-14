require('dotenv').config();
process.env.NODE_ENV = 'test';
const chai = require('chai');
const { expect, use } = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const sinon = require("sinon");
chai.use(chaiHttp);
const models = require('../models');
const { request } = require('express');
const { token } = require('morgan');
const { Member, User } = models;

describe('Members workflow tests', () => {
    const user = {
        firstName: 'Pedro',
        lastName: 'Juarez',
        email: 'pedro@test.com',
        image: 'https://res.cloudinary.com/dggzhar2j/image/upload/v1649968636/Marita_Gomez_japull.jpg',
        password: "test123",
        roleId: 1,
    }

    const memberOne = {
        id: 1,
        name: 'Juan Pablo',
        facebookUrl: 'facebook.com/pablo',
        instagramUrl: 'instagran.com/pablo',
        linkedinUrl: 'linkedin/pablo',
        image: 'https://www.imagenes.com',
        description: 'prueba'
    }

    const memberTwo = {
        id: 2,
        name: 'Pedro Perez',
        facebookUrl: 'facebook.com/pedro',
        instagramUrl: 'instagran.com/pedro',
        linkedinUrl: 'linkedin/pedro',
        image: 'https://www.imagenes.com',
        description: 'prueba'
    }
    describe('/members', (done) => {

        it('POST /members: should show errors to create member with empty data', async() => {
            sinon.stub(User, 'create').returns(user);
            chai.request(app)
            .post('/auth/register')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send(user)
            .end( (err, res) => {
                chai.request(app)
                .post('/auth/login')
                .send({ 'email': user.email, 'password': user.password})
                .end( (err, res) => {
                    const token = res.body.token
                    chai.request(app)
                    .post('/members')
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .auth(token, {type: 'bearer'})
                    .end( (err, res) => {
                    expect(res.status).to.be.equal(400);
                    expect(res.body.errors).to.be.a('array');
                    expect(res.body.length).to.be.eql(2);
                    done();
                    });
                });
            }); 
        });

        it('POST /member: should add a new member in DB', async() => {
            chai.request(app)
            .post('/auth/login')
            .send({ 'email': user.email, 'password': user.password})
            .end( (err, res) => {

                sinon.stub(Member, 'create').returns(memberOne);
                chai.request(app)
                .post('/members')
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .auth(token, {type: 'bearer'})
                .send(memberOne)
                .end( (err, res) => {
                    const actualVal = res.body.msg;
                    expect(res.status).to.be.equal(200);
                    expect(actualVal).to.be.equal('Member created');
                    done();
                });
            });
        });

        it('GET /members/id: should show one member', async() => {
            chai.request(app)
            .post('/auth/login')
            .send({ 'email': user.email, 'password': user.password})
            .end( (err, res) => {
                sinon.stub(Member, 'findOne').returns(memberTwo);           
                chai.request(app)
                .get(`/members/${memberTwo.id}`)
                .set('Content-Type', 'application/json')
                .auth(token, {type: 'bearer'})
                .end( (err, res) => {
                    const actualVal = res.body.msg;
                    expect(res.status).to.be.equal(200);
                    
                });
            });
        });

        it('GET /members/id: should show error, member not found', async() => {
            chai.request(app)
            .post('/auth/login')
            .send({ 'email': user.email, 'password': user.password})
            .end( (err, res) => {
                sinon.stub(Member, 'findOne').returns(null);
                chai.request(app)
                .get(`/members/${memberTwo.id}`)
                .set('Content-Type', 'application/json')
                .auth(token, {type: 'bearer'})
                .end( (err, res) => {
                    const actualVal = res.body.msg;
                    expect(res.status).to.be.equal(404);
                    expect(actualVal).to.be.equal('There are no registered member');
                });           
            });
        });

        it('PUT /members/id: should show error, member not found', async() => {
            chai.request(app)
            .post('/auth/login')
            .send({ 'email': user.email, 'password': user.password})
            .end( (err, res) => {
                sinon.stub(Member, 'findOne').returns(null);
                chai.request(app)
                .put(`/members/${memberOne.id}`)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .auth(token, {type: 'bearer'})
                .send(memberTwo)
                .end( (err, res) => {
                    const actualVal = res.body.msg;
                    expect(res.status).to.be.equal(404);
                    expect(actualVal).to.be.equal('There is no registered member');
                    done();
                });
            });  
        });

        it ('GET /member: should show error by members empty', async() => {
            chai.request(app)
            .post('/auth/login')
            .send({ 'email': user.email, 'password': user.password})
            .end( (err, res) => {
                sinon.stub(Member, 'findAll').returns(null);
                chai.request(app)
                .get('/members')
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .auth(token, {type: 'bearer'})
                .end( (err, res) => {
                    const actualVal = res.body.msg;
                    expect(res.status).to.be.equal(404);
                    expect(actualVal).to.be.equal('There is no members to show');
                });
            });
        });

        it('GET /members: should get members', async() => {
            chai.request(app)
            .post('/auth/login')
            .send({ 'email': user.email, 'password': user.password})
            .end( (err, res) => {
                sinon.stub(Member, 'create').set(memberOne);
                sinon.stub(Member, 'create').set(memberTwo);
                chai.request(app)
                .get('/members')
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .auth(token, {type: 'bearer'})
                .end( (err, res) => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body.members).to.be.a('array');
                    expect(res.body.length).to.be.eql(2);
                });
            }) 
        });

    });

});
