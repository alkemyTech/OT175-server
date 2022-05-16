const { expect } = require('chai');
const sinon = require("sinon");
const models = require('../models');
const { Contact } = models;
const ContactsController = require('../controllers/contacts');
const welcomeMail = require('../services/welcomeMail');
const { response } = require('express');

describe('Contacts workflow tests', () => {
    const contactOne = {
        id: 1,
        name: 'Juan',
        phone: 4341204673,
        email: 'juan@juan.com',
        message: 'message test'
    }

    const contactTwo = {
        id: 2,
        name: 'Pedro',
        phone: 4341204384,
        email: 'pedro@pedro.com',
        message: 'message test'
    }

    describe('/contacts', () => {
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

        it('GET /contacts: should show error by contacts empty', async() => {
            const req = { };
            const stub = sinon.stub(Contact, 'findAll').returns([]);
            await ContactsController.getContacts( req, res );
            expect(stub.calledOnce).to.be.true;
            expect(status.calledOnce).to.be.false;
            expect(json.calledOnce).to.be.true;
            expect(json.args[0][0].msg).to.equal('Not exists contacts registered');
        });

        it('GET /contacts: show contacts', async() => {
            const req = { };
            const stub = sinon.stub(Contact, 'findAll').returns([ contactOne, contactTwo ]);
            await ContactsController.getContacts( req, res );
            expect(stub.calledOnce).to.be.true;
            expect(json.calledOnce).to.be.true;
            expect(json.args[0][0].contacts).to.length(2);
        });

        it('POST /contacts: insert a contact in DB', async() => {
            const req = {
                body: {
                    name: 'Juan',
                    phone: 4341204673,
                    email: 'juan@juan.com',
                    message: 'message test'
                }
            };
            sinon.stub(welcomeMail, 'sendWelcomeMail').resolves(true);
            const stub = sinon.stub(Contact, 'create').returns(contactOne);
            await ContactsController.create( req, res );
            expect(stub.calledOnce).to.be.true;
            expect(json.calledOnce).to.be.true;
            expect(json.args[0][0].msg).to.equal('Contact created');
        });

    });
});