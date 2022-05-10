const models = require('../models');

const { Testimonial }  = models;
const httpCodes = require('../common/httpCodes')
const handleError = require('../common/handleError')

class TestimonialController {

  static async post(req,res) {
    try {
        let testimonial = await Testimonial.create(req.body);
        return res.status(httpCodes.OK).json(testimonial);
    }
    catch (err){
        return handleError.HTTP_ERROR_INTERNAL(err,res);
    }
  }

  static async index(req,res){
    const defaultValue = await Testimonial.findAll({ offset: 0, limit: 10 });
    if( !req.query.page ) return res.status(httpCodes.OK).json({ defaultValue });
    const { page } = req.query;

    let back = parseInt( page ) -1;
    const next = parseInt( page ) +1
    if( back === 0) {
      back = 1;
    }
    try{
        const testimonials = await Testimonial.findAll({ offset: parseInt( (page - 1) * 10 ), limit: 10});
        if ( !testimonials.length ) return res.status(httpCodes.NOT_FOUND).json({msg: 'testimonials not found'});

        return res.status(httpCodes.OK).json({
          back: `${process.env.HOST}/testimonials?page=${ back }`, 
          next: `${process.env.HOST}/testimonials?page=${ next }`, 
          testimonials
        });
    }
    catch (err){
        return handleError.HTTP_ERROR_INTERNAL(err,res);
    }
  }

  static async get(req,res) {
    try{
      let testimonial = await Testimonial.findByPk(req.params.id);
      return res.status(httpCodes.OK).json(testimonial);
    }
    catch (err){
      return handleError.HTTP_ERROR_INTERNAL(err,res);
    }
  }


  static async update(req,res) {
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

  static async delete(req,res) {
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

module.exports = TestimonialController;
