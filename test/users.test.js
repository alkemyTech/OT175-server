const chai= require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;
const should = chai.should;
const server = require('../app');

chai.use(chaiHttp)