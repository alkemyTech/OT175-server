const { expect } = require('chai');
const sinon = require("sinon");
const models = require('../models');
const { News } = models;
const NewsCtrl = require('../controllers/news.controllers');
const controller = new NewsCtrl();

describe('News workflow tests', () => {
    const newOne = {
        id: 1,
        name: "New 1",
        content: "New content",
        image: "https://www.caracteristicas.co/news/",
        categoryId: 1
    }

    const newTwo = {
        id: 2,
        name: "New 2",
        content: "New content 2",
        image: "https://www.caracteristicas.co/news/",
        categoryId: 1
    }

    describe('/news', () => {
        let status, json, res;

        beforeEach(() => {
            status = sinon.stub();
            json = sinon.spy();
            res = { json, status };
            status.returns(res);
        });
        
        afterEach(()=> { 
            sinon.verifyAndRestore(); 
        });

        it('GET /news: should show error by news empty', async () => {
            const req = { query: { page: 1 } };
            const stub = sinon.stub(News, 'findAll').returns([]);
            await controller.getAll( req, res );
            expect(stub.calledOnce).to.be.true;
            expect(status.calledOnce).to.be.true;
            expect(status.args[0][0]).to.equal(404);
            expect(json.calledOnce).to.be.true;
            expect(json.args[0][0].msg).to.equal('News and/or the page requested has no records');
        });

        it('GET /news, should get members', async () => {
            const req = { query: { page: 0 } };
            const stub = sinon.stub(News, 'findAll').returns([ newOne, newTwo ]);
            await controller.getAll( req, res );
            expect(stub.calledOnce).to.be.true;
            expect(status.calledOnce).to.be.true;
            expect(status.args[0][0]).to.equal(200);
            expect(json.calledOnce).to.be.true;
            expect(json.args[0][0].articles).to.length(2);
        });
    });
});