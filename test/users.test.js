const chai= require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;
const should = chai.should();

const app = require('../app');


chai.use(chaiHttp)

describe('Testing users ...', ()=>{
    it('users/get ... ', (done)=>{
        chai.request(app)
        .get('/users')
        .end((err, res)=>{
            res.should.have.status(200);

            done();
        })
    });
})