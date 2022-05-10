const Model = require('../models');
const { Slides } = Model;
const HttpStatusCodes = require('../common/httpCodes');
const handleError = require('../common/handleError');

class SlideController {

  static async index(req,res,next) {
    let slides;
    try{
      slides = await Slides.findAll({
        attributes: ["imageUrl","order"]
      });
    }
    catch (err){
      return handleError.HTTP_ERROR_INTERNAL(err,res);
    }
    return res.status(HttpStatusCodes.OK).json(slides);
  }
  static async delete(req, res, next) {
    let slide, result;

    try {
      slide = await Slides.findByPk(req.params.id);
    } catch (err) {
      return handleError.HTTP_ERROR_INTERNAL(err, res);
    }

    if (!slide) {
      return handleError.HTTP_BAD_REQUEST(res);
    }

    try {
      result = await Slides.destroy({
        where: {
          id: req.params.id,
        },
      });
    } catch (err) {
      return handleError.HTTP_ERROR_INTERNAL(err, res);
    }

    return res.status(HttpStatusCodes.OK).json(result);
  }

  static async getSlideByPk(req, res) {
    const { id } = req.params;
    let slide;
    try {
      slide = await Slides.findByPk(id);
    } catch (err) {
      return handleError.HTTP_ERROR_INTERNAL(err, res);
    }
    if (!slide) {
      return res
        .status(HttpStatusCodes.NOT_FOUND)
        .json({ msg: 'slide not found' });
    }
    return handleError.HTTP_OK(res, slide);
  }
}

module.exports = SlideController;
