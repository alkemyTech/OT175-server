const models = require('../models');
const { Activity }  = models;
const httpCodes = require('../common/httpCodes')
const handleError = require('../common/handleError')

class ActivityController {

  async post(req,res) {
    try {
        let activity = await Activity.create(req.body);
        return res.status(httpCodes.OK).json(activity);
    }
    catch (err){
          return handleError.HTTP_ERROR_INTERNAL(err,res);
    }
  }

  async index(req,res){
    try{
        let activities = await Activity.findAll();
        return res.status(httpCodes.OK).json(activities);
    }
    catch (err){
        return handleError.HTTP_ERROR_INTERNAL(err,res);
    }
  }

  async get(req,res) {
    try{
      let activity = await Activity.findByPk(req.params.id);
      return res.status(httpCodes.OK).json(activity);
    }
    catch (err){
      return handleError.HTTP_ERROR_INTERNAL(err,res);
    }
  }

  async update(req,res) {
    try {

      let activity = await Activity.findOne({
        where:{
          id: req.params.id
        }
      });

      if(!activity){
        return res.status(400).json("Activity not found");
      }
      else{
        activity.update(req.body);
      }
      return res.status(httpCodes.OK).json(activity);
    }
    catch (err){
          return handleError.HTTP_ERROR_INTERNAL(err,res);
    }
  }

  async delete(req,res) {
    try{
      let activity = await Activity.destroy({
        where: {
          id: req.params.id
        }
      });
      return res.status(httpCodes.OK).json(activity);
    }
    catch (err){
      return handleError.HTTP_ERROR_INTERNAL(err,res);
    }
  }
}

module.exports = new ActivityController(); 