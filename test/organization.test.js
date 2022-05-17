const { expect } = require('chai');
const sinon = require('sinon');
const models = require('../models');
const { Organization } = models;
const OrganizationController = require('../controllers/organizations.controller');

describe('Organizations workflow tests', () => {
  const organizationOne = {
    id:1,
    name: "Prueba organization",
    image: "https://www.google.com" ,
    address: "calle siempre viva",
    phone: 0057005700,
    email: "pruebaorganizacion@gmail.com",
    welcomeText: "welcome text",
    aboutUsText: "about Us text",
    urlFacebook: "https://www.facebook.com",    
    urlLinkedin: "https://www.linkedin.com",
    urlInstagram: "https://www.instagram.com",
  };

  const organizationTwo = {
    id:1,
    name: "Prueba organization two",
    image: "https://www.google.com" ,
    address: "calle siempre viva 123",
    phone: 0057005754,
    email: "pruebaorganizaciontwo@gmail.com",
    welcomeText: "welcome text x2",
    aboutUsText: "about Us text x2",
    urlFacebook: "https://www.facebook.com",    
    urlLinkedin: "https://www.linkedin.com",
    urlInstagram: "https://www.instagram.com",
  };

  describe('/organization', () => {
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

    it('GET /organization/id: should show error, organization not found', async() => {
      const req = { params: { id: organizationTwo.id } };
      const stub = sinon.stub(Organization, 'findOne').returns(null);
      await OrganizationController.getOrganization( req, res );
      expect(stub.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(404);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].msg).to.equal("There aren't registered organization");
  });
  it('GET /organization/id: should show one organization', async() => {
    const req = { params: { id: organizationOne.id } };
    const stub = sinon.stub(Organization, 'findOne').returns(organizationOne);
    await OrganizationController.getOrganization( req, res );
    expect(stub.calledOnce).to.be.true;
    expect(status.calledOnce).to.be.true;
    expect(status.args[0][0]).to.equal(200);
    expect(json.calledOnce).to.be.true;
    expect(json.args[0][0].organization).to.equal(organizationOne);
});

    it('POST /organization: should add a new organization in DB', async() => {
        const req = {
            body: {
              name: "Prueba organization",
              image: "https://www.google.com" ,
              address: "calle siempre viva",
              phone: 0057005700,
              email: "pruebaorganizacion@gmail.com",
              welcomeText: "welcome text",
              aboutUsText: "about Us text",
              urlFacebook: "https://www.facebook.com",    
              urlLinkedin: "https://www.linkedin.com",
              urlInstagram: "https://www.instagram.com"
            }
        };

        const stub = sinon.stub(Organization, 'create').returns(organizationOne);
        await OrganizationController.createOrganization( req, res );
        expect(stub.calledOnce).to.be.true;
        expect(status.calledOnce).to.be.true;
        expect(status.args[0][0]).to.equal(201);
        expect(json.calledOnce).to.be.true;
        expect(json.args[0][0].msg).to.equal('Organization created');
    });
    
  it('GET /organizations: should get organizations', async() => {
      const req = { query: { page: 1 } };
      const stub = sinon.stub(Organization, 'findAll').returns([ organizationOne, organizationTwo ]);
      await OrganizationController.getOrganizations( req, res );
      expect(stub.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].organizations).to.length(2);
  });

  it('PUT /organizations/id: should update a organization', async() => {
      const req = 
          { 
              params: 
                  { 
                      id: organizationOne.id 
                  },
              body: {
                name: "Prueba organization",
                image: "https://www.google.com" ,
                address: "calle siempre viva",
                phone: 0057005700,
                email: "pruebaorganizacion@gmail.com",
                welcomeText: "welcome text",
                aboutUsText: "about Us text",
                urlFacebook: "https://www.facebook.com",    
                urlLinkedin: "https://www.linkedin.com",
                urlInstagram: "https://www.instagram.com",
              }
          };
      
      const fake = sinon.fake()
      organizationOne.update = fake;
      const stub = sinon.stub(Organization, 'findOne').returns(organizationOne);
      await OrganizationController.updateOrganization(req, res);
      expect(stub.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].msg).to.equal('Organization updated');
  });

  it('DELETE /organizations/id: should show error, organization not exist', async() => {
      const req = { params: { id: organizationOne.id } };
      const stub = sinon.stub(Organization, 'findOne').returns(null);
      await OrganizationController.deleteOrganization(req, res);
      expect(stub.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(404);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].msg).to.equal('the organization you are trying to register does not exist');
  });

  it('DELETE /organizations/id, should delete a organization', async() => {
      const req = { params: { id: organizationOne.id } };
      const fake = sinon.fake();
      organizationOne.destroy = fake;
      const stub = sinon.stub(Organization, 'findOne').returns(organizationOne);
      await OrganizationController.deleteOrganization(req, res);
      expect(stub.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(200);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].msg).to.equal('Organization deleted');
  });
    
  });
});
