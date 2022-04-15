const { response } = require("express");
const  models  = require("../models");
const {Organization} = models;

 class OrganizationController {
    
    constructor(){
        this.getOrganizations
        this.getOrganization;
        this.createOrganization;
        this.updateOrganization;
        this.deleteOrganization;
    }

    async getOrganizations(req, res){
      try {
        const organizations = await Organization.findAll();
        return res.status(200).json(organizations);
      } catch (error) {
        console.log(error);
      }
    };
    
    
    async getOrganization (req, res = response){
      const { id } = req.params;
    
      try {
        const organization = await Organization.findOne({
          where: { id: id },
        });
    
        if (!organization) {
          return res.status(404).json({
            message: "unregistered organization",
          });
        }
        return res.status(200).json(organization);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    };
    
    async updateOrganization(req, res = response) {
    
        const {id} = req.params;
        const body = req.body;
    
        try {
            const organization = await Organization.update(body, {
                where: {id: id}
            });
    
            const organizationResponse = await Organization.findByPk(id);
    
            if(!organizationResponse){
              return res.status(404).json({message: 'unregistered organization'});
            }
            return res.status(200).json({
                message: 'Organization updated',
                organizationResponse
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    }
    
    async createOrganization (req, res = response){
    
        const {createdAt, updatedAt, ...body} = req.body;
    
        const data = {
            ...body,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        try {
            const organization = await Organization.create(data);
            return res.status(201).json({
                message: 'Organization created',
                organization
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    }
    
    async deleteOrganization(req, res = response){
    
        const {id} = req.params;
    
        try {
    
            const organization = await Organization.destroy({
                where: {
                    id: id,
                }
            });
            const organizationResponse = await Organization.findByPk(id);
    
            if(!organizationResponse){
                return res.status(404).json({message: 'unregistered organization'});
            }
            
            return res.status(200).json({
                message: 'Organization deleted',
                organizationResponse
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    }
}

module.exports = OrganizationController;