const models = require('../models');
const { Testimonial }  = models;
const httpCodes = require('../common/httpCodes')
const handleError = require('../common/handleError')

class TestimonialController {

  async post(req,res) {
    try {
        let testimonial = await Testimonial.create(req.body);
        return res.status(httpCodes.OK).json(testimonial);
    }
    catch (err){
        return handleError.HTTP_ERROR_INTERNAL(err,res);
    }
  }

  async index(req,res){
    try{
        let testimonials = await Testimonial.findAll();
        return res.status(httpCodes.OK).json(testimonials);
    }
    catch (err){
        return handleError.HTTP_ERROR_INTERNAL(err,res);
    }
  }

  async get(req,res) {
    try{
      let testimonial = await Testimonial.findByPk(req.params.id);
      return res.status(httpCodes.OK).json(testimonial);
    }
    catch (err){
      return handleError.HTTP_ERROR_INTERNAL(err,res);
    }
  }

  async update(req,res) {
    try {

      let testimonial = await Testimonial.findOne({
        where:{
          id: req.params.id
        }
      });

      if(!testimonial){
        return handleError.HTTP_BAD_REQUEST(res)
      }
      else{
        testimonial.update(req.body);
      }
      return res.status(httpCodes.OK).json(testimonial);
    }
    catch (err){
          return handleError.HTTP_ERROR_INTERNAL(err,res);
    }
  }

  async delete(req,res) {
    try{
      let testimonial = await Testimonial.destroy({
        where: {
          id: req.params.id
        }
      });
      return res.status(httpCodes.OK).json(testimonial);
    }
    catch (err){
      return handleError.HTTP_ERROR_INTERNAL(err,res);
    }
  }
}

module.exports = new TestimonialController(); 