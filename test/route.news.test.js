const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const request = require('supertest');

const app = require('../app');
const models = require("./../models");

const expect = chai.expect;
const { News } = models;
chai.use(chaiHttp);

const EMPTY_PAGE_LOCAL = 'localhost:3000/news?page=NaN'; // wrong response

describe('News route test', function () {
  describe('Should call news controller, method getAll', function () {

    const sandbox = sinon.createSandbox();
    afterEach( () => {
      sinon.restore();
      sandbox.restore();
    });

    it.only('should call stubbed function at with empty response', async function () {
      // Arrange
      News.findAndCountAll = sandbox
          .stub()
          .returns(Promise.resolve([]))

      // Act
      const response = await request(app)
          .get("/news")
          .expect(200)
      const news = response.body;

      // Assert
      expect(news).to.be.an("object");
      expect(news.urlPreviousPage).to.be.equal(EMPTY_PAGE_LOCAL);
      expect(news.urlNextPage).to.be.equal(EMPTY_PAGE_LOCAL);
    });
  });
});
