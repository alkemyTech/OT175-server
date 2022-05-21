const { expect } = require('chai');
const sinon = require("sinon");
const models = require('../models');
const { Activity } = models;
const ActivityController = require('../controllers/activities');


describe('Activities workflow tests', () => {
    const activityTest = {
        id: 1,
        name: 'Nombre Activitie',
        image: 'https://www.imagenes.com',
        content: 'Contenido'
    
    }

    const body = {
        name: 'Nombre Activitie',
        image: 'https://www.imagenes.com',
        content: 'Contenido'
    }
    describe('/activities', () => {
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

        it('POST /activities: should add a new actvity in DB', async() => {
            const req = {
                body: body
            };

            const stub = sinon.stub(Activity, 'create').returns(activityTest);
            await ActivityController.post( req, res );
            expect(stub.calledOnce).to.be.true;
            expect(status.calledOnce).to.be.true;
            expect(status.args[0][0]).to.equal(200);
            expect(json.calledOnce).to.be.true;
            expect(json.args[0][0].msg).to.equal('Activity created');
        });

        it('GET /activities/id (incorrect ID): should show error, activity not found', async() => {
            const req = { params: { id: 1 } };
            const stub = sinon.stub(Activity, 'findByPk').returns(null);
            await ActivityController.get( req, res);
            expect(stub.calledOnce).to.be.true;
            expect(status.calledOnce).to.be.true;
            expect(status.args[0][0]).to.equal(400);
            expect(json.calledOnce).to.be.true;
            expect(json.args[0][0].msg).to.equal('Activity not found');
        });

        it('GET /activities/id: should show one activity', async() => {
            const req = { params: { id: 1 } };
            const stub = sinon.stub(Activity, 'findByPk').returns(activityTest);
            await ActivityController.get( req, res );
            expect(stub.calledOnce).to.be.true;
            expect(status.calledOnce).to.be.true;
            expect(status.args[0][0]).to.equal(200);
            expect(json.calledOnce).to.be.true;
            expect(json.args[0][0].activity).to.equal(activityTest);
        });

        it('PUT /activities/id (incorrect ID): should show error, activity not found', async() => {
            const req = 
                { 
                    params: 
                        { 
                            id: 1
                        },
                    body: body
                        
                };
            const stub = sinon.stub(Activity, 'findOne').returns(null);
            await ActivityController.update(req, res);
            expect(stub.calledOnce).to.be.true;
            expect(status.calledOnce).to.be.true;
            expect(status.args[0][0]).to.equal(400);
            expect(json.calledOnce).to.be.true;
            expect(json.args[0][0].msg).to.equal('Activity not found');
        });

        it('PUT /activities/id: should update an activity', async() => {
            const req = 
                { 
                    params: 
                        { 
                            id: 1
                        },
                    body: body
                };
            
            const fake = sinon.fake()
            activityTest.update = fake;
            const stub = sinon.stub(Activity, 'findOne').returns(activityTest);
            await ActivityController.update(req, res);
            expect(stub.calledOnce).to.be.true;
            expect(status.calledOnce).to.be.true;
            expect(status.args[0][0]).to.equal(200);
            expect(json.calledOnce).to.be.true;
            expect(json.args[0][0].activity).to.equal(activityTest);
        });

        it('DELETE /activities/id (incorrect ID): should show error, activity not found', async() => {
            const req = { params: { id: 1 } };
            const stub = sinon.stub(Activity, 'findOne').returns(null);
            await ActivityController.delete(req, res);
            expect(stub.calledOnce).to.be.true;
            expect(status.calledOnce).to.be.true;
            expect(status.args[0][0]).to.equal(400);
            expect(json.calledOnce).to.be.true;
            expect(json.args[0][0].msg).to.equal('Activity not found');
        });

        it('DELETE /activities/id:  should delete an activity', async() => {
            const req = { params: { id: 1 } };
            const fake = sinon.fake();
            activityTest.destroy = fake;
            const stub = sinon.stub(Activity, 'findOne').returns(activityTest);
            await ActivityController.delete(req, res);
            expect(stub.calledOnce).to.be.true;
            expect(status.calledOnce).to.be.true;
            expect(status.args[0][0]).to.equal(200);
            expect(json.calledOnce).to.be.true;
            expect(json.args[0][0].msg).to.equal('Activity deleted');
        });

    });
});