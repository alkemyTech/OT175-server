const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

const models = require('../models');
const { News } = models;

const NewsController = require('../controllers/news.controllers');

describe('News Controller test', function () {
  describe('Should add a new', function () {
    let status, json, res;

    const newsController = new NewsController();

    status = sinon.stub();
    json = sinon.spy();
    res = { json, status };
    status.returns(res);

    const body = {
      name: 'news name 01',
      content: 'news content 01',
      image: 'news image 01',
      categoryId: 1
    };

    const stubValue = {
      ...body,
      id: 1,
      createdAt: '',
      updatedAt: ''
    };

    beforeEach(() => {
      //Before each instructions
    });

    it('should add a new new to db', async function () {
      const stub = sinon.stub(News, 'create').returns(stubValue);

      const req = {
        body: stubValue
      };

      await newsController.createNews(req, res);
      expect(stub.calledOnce).to.be.true;

      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(201);

      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0]).to.equal(stubValue);
    }); //end it;
  });
});
