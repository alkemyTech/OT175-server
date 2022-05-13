require('dotenv').config();
const chai= require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;
const should = chai.should();

const app = require('../app');


chai.use(chaiHttp)

describe('Testing users ...', ()=>{
    it('users index ... ', (done)=>{
        chai.request(app)
        .get('/users')
        .set({'authorization':`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZUlkIjoxfQ._pt0jYNX-zzzfZN10U_gIRt77A-_3qW_i6jf0PXWsNk`})
        .end((err, res)=>{
            res.should.have.status(200);
            res.body.should.be.an('array');
            done();
        });
    });
    it('get user by id ... ', (done)=>{
        chai.request(app)
        .get(`/users/${1}`)
        .end((err, res)=>{
            res.should.have.status(200);
            res.should.be.a('object');
            res.body.should.have.all.keys(
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
    });
    it('update user ... ', (done)=>{
        chai.request(app)
        .put(`/users/update/1`)
        .send({
            'firstName':"lala",
            // 'lastName':"lastname",
            // 'email': "email@gmail.com",
            // 'photo': "img.com",
            // 'password': "1234",
            // 'roleId': 1,
        })
        .end((err, res)=>{
            res.should.have.status(200);
            res.body.should.be.an('array');
            res.body.should.contain(1)
            done();
        });
    });
    it('delete my user ... ', (done)=>{
        chai.request(app)
        .delete('/users/20')
        .set({'authorization':`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsInJvbGVJZCI6MX0.uvPG-xtuXk7NNH0LGJcLSIT4exzUGHEuxb-iP1b1tw8`})
        .end((err, res)=>{
            res.should.have.status(200);
            res.body.should.be.an('object');
            res.body.should.have.property( 'msge', 'The user has been successfully deleted')
            done();
        });
    });
    it('patch user ... ', (done)=>{
        chai.request(app)
        .patch(`/users/patch/19`)
        .set({'authorization':`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTksInJvbGVJZCI6MX0.La4tgbwCnsY7_zGt0LyCnOhGclhd0awqB-0cH2M6pII`})
        .send({
            'firstName':"Usuario 19",
            // 'lastName':"lastname",
            // 'email': "email@gmail.com",
            // 'photo': "img.com",
            // 'password': "1234",
            // 'roleId': 1,
        })
        .end((err, res)=>{
            res.should.have.status(200);
            res.body.should.be.an('object');
            res.body.should.have.property('Updated records: ')
            done();
        });
    });
})