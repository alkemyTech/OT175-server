const { response } = require("express");
const HttpStatus = require("../common/handleError");
const models = require("../models");
const { Organization } = models;

class OrganizationController {
  constructor() {}

  async getOrganizations(req, res) {
    let organizations;
    try {
      organizations = await Organization.findAll();
    } catch (error) {
      return HttpStatus.HTTP_ERROR_INTERNAL(error, res);
    }
    return HttpStatus.HTTP_OK(res, organizations);
  }

  async getOrganization(req, res = response) {
    const { id } = req.params;
    let organization;
    try {
      organization = await Organization.findOne({
        where: { id: id },
        attributes: ["name", "phone", "email", "address"],
      });
      if (!organization) {
        return HttpStatus.HTTP_BAD_REQUEST(res);
      }
    } catch (error) {
      return HttpStatus.HTTP_ERROR_INTERNAL(error);
    }
    return HttpStatus.HTTP_OK(res, organization);
  }

  async updateOrganization(req, res = response) {
    const { id } = req.params;
    const body = req.body;
   
    try {
      await Organization.update(body, {
        where: { id },
      });

     } catch (error) {
      return HttpStatus.HTTP_ERROR_INTERNAL(error, res);
    }
    return HttpStatus.HTTP_OK(res, "successed update");
  }

  async createOrganization(req, res = response) {
    
    const { createdAt, updatedAt, ...body } = req.body;
    const data = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    let organization;
    try {
      organization = await Organization.create(data);
    } catch (error) {
      return HttpStatus.HTTP_ERROR_INTERNAL(error, res);
    }
    return HttpStatus.HTTP_CREATE(res, organization);
  }

  async deleteOrganization(req, res = response) {
    const { id } = req.params;
    let organizationResponse;
    try {
      organizationResponse = await Organization.findByPk(id);

      if (!organizationResponse) {
        return HttpStatus.HTTP_BAD_REQUEST(res);
      }
      const organization = await Organization.destroy({
        where: {
          id: id,
        },
      });
    } catch (error) {
      return HttpStatus.HTTP_ERROR_INTERNAL(error, res);
    }
    return HttpStatus.HTTP_OK(res, organizationResponse);
  }
}

module.exports = OrganizationController;
