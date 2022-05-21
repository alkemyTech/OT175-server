const models = require('../models');
const { Activity }  = models;
const httpCodes = require('../common/httpCodes')
const handleError = require('../common/handleError')

class ActivityController {

  async post(req,res) {
    try {
        let activity = await Activity.create(req.body);
        return res.status(httpCodes.OK).json({msg:"Activity created"});
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
      if(!activity)
        return res.status(httpCodes.BAD_REQUEST).json({msg: "Activity not found"});

      return res.status(httpCodes.OK).json({activity});
    }
    catch (err){
      return handleError.HTTP_ERROR_INTERNAL(err,res);
    }
  }

  async update(req,res) {
    let activity;
    try {
      activity = await Activity.findOne({
        where:{
          id: req.params.id
        }
      });
    }
    catch (err){
          return handleError.HTTP_ERROR_INTERNAL(err,res);
    }

    if(!activity){
      return res.status(400).json({msg:"Activity not found"});
    }
    try{
      activity.update(req.body);
    }
    catch (err){
      return handleError.HTTP_ERROR_INTERNAL(err,res);
    }
    return res.status(httpCodes.OK).json({activity});
    
  }

  async delete(req,res) {
    let activity;
    try{
      activity = await Activity.findOne({
        where:{
          id: req.params.id
        }
      });
    }catch (err){
      return handleError.HTTP_ERROR_INTERNAL(err,res);
    }

    if(!activity){
      return res.status(400).json({msg:"Activity not found"});
    }
    
    try{
      activity.destroy();
    }catch (err){
      return handleError.HTTP_ERROR_INTERNAL(err,res);
    }
    res.status(httpCodes.OK).json({ msg: 'Activity deleted' });
   
  }
}

module.exports = new ActivityController(); 