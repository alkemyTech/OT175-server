const Model = require('../models');
const { Slide } = Model;
const SlideController = require('../controllers/SlideController');

class SlideController {
  async updateSlide(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ errors: errors.array() });
    } else {
      //si todo el middleware y validaciones salió bien:

      var slide = {};

      try {
        //Slide.update
      } catch (error) {
        return res.sendStatus(404).send({ error: error.message });
      }
    }
  }
}

module.exports = new SlideController();
