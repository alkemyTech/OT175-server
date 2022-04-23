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
        if(err.name === "SequelizeValidationError" || !req.body.name ){
          return handleError.HTTP_BAD_REQUEST(res);
        }
        else{
          return handleError.HTTP_ERROR_INTERNAL(err,res);
        }
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
      let activity = await Activity.update(
        req.body,
        {
          where:{
            id: req.params.id
        }
      });
      return res.status(httpCodes.OK).json(activity);
    }
    catch (err){
        if(err.name === "SequelizeValidationError"){
          return handleError.HTTP_BAD_REQUEST(res);
        }
        else{
          return handleError.HTTP_ERROR_INTERNAL(err,res);
        }
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