const Model = require('../models');
const { Slides } = Model;
const DbAux = require('../common/dbAux');
const HttpStatusCodes = require('../common/httpCodes');

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
          where: { id: slideId },
        }
      );
    } catch (error) {
      return res
        .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: error.message });
    }

    return res.send({ 'Updated records: ': result });
  }
}

module.exports = SlideController;
