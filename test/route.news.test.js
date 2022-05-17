const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const expect = chai.expect;

chai.use(chaiHttp);

const app = require('../app');

const NewsController = require('../controllers/news.controllers');

describe('News route test', function () {
  describe('Should call news controller, method getAll', function () {
    it('should call stubed function at least once', async function () {
      const newsController = new NewsController();

      const stub = sinon.stub(newsController, 'getAll').returns([]);

      await chai.request(app).get('/news');

      console.log('stub.calledOnce ', stub.calledOnce);

      expect(stub.calledOnce).to.be.true;
    }); //end it;
  });
});
