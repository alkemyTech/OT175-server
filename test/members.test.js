const { expect } = require('chai');
const sinon = require("sinon");
const models = require('../models');
const { Member } = models;
const MemberController = require('../controllers/members');

describe('Members workflow tests', () => {
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

    describe('/members', () => {
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

        it('POST /member: should add a new member in DB', async() => {
            const req = {
                body: {
                    name: 'Juan Pablo',
                    facebookUrl: 'facebook.com/pablo',
                    instagramUrl: 'instagran.com/pablo',
                    linkedinUrl: 'linkedin/pablo',
                    image: 'https://www.imagenes.com',
                    description: 'prueba'
                }
            };

            const stub = sinon.stub(Member, 'create').returns(memberOne);
            await MemberController.postMember( req, res );
            expect(stub.calledOnce).to.be.true;
            expect(status.calledOnce).to.be.true;
            expect(status.args[0][0]).to.equal(200);
            expect(json.calledOnce).to.be.true;
            expect(json.args[0][0].msg).to.equal('Member created');
        });

        it('GET /members/id: should show error, member not found', async() => {
            const req = { params: { id: memberOne.id } };
            const stub = sinon.stub(Member, 'findOne').returns(null);
            await MemberController.getMemberById( req, res );
            expect(stub.calledOnce).to.be.true;
            expect(status.calledOnce).to.be.true;
            expect(status.args[0][0]).to.equal(404);
            expect(json.calledOnce).to.be.true;
            expect(json.args[0][0].msg).to.equal('There are no registered member');
        });

        it('GET /members/id: should show one member', async() => {
            const req = { params: { id: memberOne.id } };
            const stub = sinon.stub(Member, 'findOne').returns(memberOne);
            await MemberController.getMemberById( req, res );
            expect(stub.calledOnce).to.be.true;
            expect(status.calledOnce).to.be.true;
            expect(status.args[0][0]).to.equal(200);
            expect(json.calledOnce).to.be.true;
            expect(json.args[0][0].member).to.equal(memberOne);
        });

        it ('GET /member: should show error by members empty', async() => {
            const req = { query: { page: 1 } };
            const stub = sinon.stub(Member, 'findAll').returns([]);
            await MemberController.getMembers( req, res );
            expect(stub.calledOnce).to.be.true;
            expect(status.calledOnce).to.be.true;
            expect(status.args[0][0]).to.equal(404);
            expect(json.calledOnce).to.be.true;
            expect(json.args[0][0].msg).to.equal('There is no members to show');
        });

        it('GET /members: should get members', async() => {
            const req = { query: { page: 1 } };
            const stub = sinon.stub(Member, 'findAll').returns([ memberOne, memberTwo ]);
            await MemberController.getMembers( req, res );
            expect(stub.calledOnce).to.be.true;
            expect(status.calledOnce).to.be.true;
            expect(status.args[0][0]).to.equal(200);
            expect(json.calledOnce).to.be.true;
            expect(json.args[0][0].members).to.length(2);
        });

        it('PUT /members/id: should show error,There is no registered member', async() => {
            const req = 
                { 
                    params: 
                        { 
                            id: memberOne.id 
                        },
                    body: {
                        name: 'Juan Pablo',
                        facebookUrl: 'facebook.com/pablo',
                        instagramUrl: 'instagran.com/pablo',
                        linkedinUrl: 'linkedin/pablo',
                        image: 'https://www.imagenes.com',
                        description: 'prueba'
                    }
                };
            const stub = sinon.stub(Member, 'findOne').returns(null);
            await MemberController.updateMemberById(req, res);
            expect(stub.calledOnce).to.be.true;
            expect(status.calledOnce).to.be.true;
            expect(status.args[0][0]).to.equal(404);
            expect(json.calledOnce).to.be.true;
            expect(json.args[0][0].msg).to.equal('There is no registered member');
        });

        it('PUT /members/id: should update a member', async() => {
            const req = 
                { 
                    params: 
                        { 
                            id: memberOne.id 
                        },
                    body: {
                        name: 'Juan Pablo',
                        facebookUrl: 'facebook.com/pablo',
                        instagramUrl: 'instagran.com/pablo',
                        linkedinUrl: 'linkedin/pablo',
                        image: 'https://www.imagenes.com',
                        description: 'prueba'
                    }
                };
            
            const fake = sinon.fake()
            memberOne.update = fake;
            const stub = sinon.stub(Member, 'findOne').returns(memberOne);
            await MemberController.updateMemberById(req, res);
            expect(stub.calledOnce).to.be.true;
            expect(status.calledOnce).to.be.true;
            expect(status.args[0][0]).to.equal(200);
            expect(json.calledOnce).to.be.true;
            expect(json.args[0][0].msg).to.equal('Member updated');
        });

        it('DELETE /members/id: should show error, member not exist', async() => {
            const req = { params: { id: memberOne.id } };
            const stub = sinon.stub(Member, 'findOne').returns(null);
            await MemberController.deleteMemberById(req, res);
            expect(stub.calledOnce).to.be.true;
            expect(status.calledOnce).to.be.true;
            expect(status.args[0][0]).to.equal(404);
            expect(json.calledOnce).to.be.true;
            expect(json.args[0][0].msg).to.equal('the member you are trying to register does not exist');
        });

        it('DELETE /members/id, should delete a member', async() => {
            const req = { params: { id: memberOne.id } };
            const fake = sinon.fake();
            memberOne.destroy = fake;
            const stub = sinon.stub(Member, 'findOne').returns(memberOne);
            await MemberController.deleteMemberById(req, res);
            expect(stub.calledOnce).to.be.true;
            expect(status.calledOnce).to.be.true;
            expect(status.args[0][0]).to.equal(200);
            expect(json.calledOnce).to.be.true;
            expect(json.args[0][0].msg).to.equal('Member deleted');
        });

    });
});
