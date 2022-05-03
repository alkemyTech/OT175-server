const Model = require('../models');
const { Slide } = Model;
const SlideController = require('../controllers/SlideController');

class SlideController {
  static async updateSlide(req, res, next) {
    var slide, result;

    let slideId = req.params.id;

    try {
      slide = await Slide.findByPk(slideId);

      if (!slide) {
        throw new Error('Slide not found');
      }
    } catch (error) {
      return res
        .status(HttpStatusCodes.NOT_FOUND)
        .send({ status: error.message });
    }

    let body = req.body;
    slide = dbAux.composeModelRecord(body, slide);

    try {
      result = await Slide.update(
        slide.dataValues,

        {
          where: { id: slideId },
        }
      );
    } catch (error) {
      return res
        .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .send({ status: error.message });
    }

    return res.send({ 'Updated records: ': result });
  }
}

module.exports = SlideController;
