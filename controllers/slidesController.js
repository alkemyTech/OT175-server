const Model = require('../models');
const { Slides } = Model;
const DbAux = require('../common/dbAux');
const HttpStatusCodes = require('../common/httpCodes');
const handleError = require('../common/handleError');

class SlideController {
  static async updateSlide(req, res, next) {
    let slide, result;

    let slideId = req.params.id;

    try {
      slide = await Slides.findByPk(slideId);

      if (!slide) {
        throw new Error('Slide not found');
      }
    } catch (error) {
      return res
        .status(HttpStatusCodes.NOT_FOUND)
        .send({ status: error.message });
    }

    slide = DbAux.composeModelRecord(req.body, slide);

    try {
      result = await Slides.update(
        slide.dataValues,

        {
          where: { id: slideId }
        }
      );
    } catch (error) {
      return res
        .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: error.message });
    }

    return res.send({ 'Updated records: ': result });
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
          id: req.params.id
        }
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
