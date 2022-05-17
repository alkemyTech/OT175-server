const { response } = require('express');
const HttpStatus = require('../common/handleError');
const httpCodes = require('../common/httpCodes');
const models = require('../models');
const slides = require('../models/slides');
const { Organization, Slides } = models;

class OrganizationController {
  static async getOrganizations(req, res) {
    let organizations;
    try {
      organizations = await Organization.findAll();
    } catch (error) {
      return HttpStatus.HTTP_ERROR_INTERNAL(error, res);
    }
    if (!organizations) {
      res
        .status(httpCodes.NOT_FOUND)
        .json({ msg: "There aren't registered organizations" });
    }
    return HttpStatus.HTTP_OK(res, organizations);
  }

  static async getOrganization(req, res = response) {
    const { id } = req.params;
    let organization;
    let slides;
    try {
      organization = await Organization.findOne({
        where: { id: id },
        attributes: ['name', 'phone', 'email', 'address'],
      });
      slides = await Slides.findAll({
        where: { organizationId: id },
        attributes: ['id', 'text', 'imageUrl', 'order'],
      });
      if (!organization) {
        res
          .status(httpCodes.NOT_FOUND)
          .json({ msg: "There aren't registered organization" });
      }
    } catch (error) {
      return HttpStatus.HTTP_ERROR_INTERNAL(error);
    }
    slides.sort((a, b) => {
      return a.order - b.order;
    });
    res.status(httpCodes.OK).json({ organization, slides });
  }

  static async updateOrganization(req, res = response) {
    const { id } = req.params;
    const body = req.body;

    try {
      await Organization.update(body, {
        where: { id },
      });
    } catch (error) {
      return HttpStatus.HTTP_ERROR_INTERNAL(error, res);
    }
    res.status(httpCodes.OK).json({ msg: 'Organization updated' });
  }

  static async createOrganization(req, res = response) {
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
    res.status(httpCodes.CREATED).json({ msg: 'Organization created' });
  }

 static async deleteOrganization(req, res = response) {
    const { id } = req.params;
    let organizationResponse;
    try {
      organizationResponse = await Organization.findByPk(id);

      if (!organizationResponse) {
        return res.status(httpCodes.NOT_FOUND).json({ msg: 'the organization you are trying to register does not exist' });
      }
      await Organization.destroy({
        where: {
          id: id,
        },
      });
    } catch (error) {
      return HttpStatus.HTTP_ERROR_INTERNAL(error, res);
    }
    return res.status(httpCodes.OK).json({ msg: 'Organization deleted' });
  }
}

module.exports = OrganizationController;
