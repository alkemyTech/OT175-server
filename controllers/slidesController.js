const Model = require('../models');
const { Slides } = Model;
const DbAux = require('../common/dbAux');
const HttpStatusCodes = require('../common/httpCodes');
const handleError = require('../common/handleError');

class SlideController {
  static async delete(req, res, next) {
    let slide, result;

    try {

      slide = await Slides.findByPk(req.params.id);

    } catch (err) {

      return handleError.HTTP_ERROR_INTERNAL(err,res);

    }

    if (!slide) {
        return handleError.HTTP_BAD_REQUEST(res);
    }

    try {
      result = await Slides.destroy(
        {
          where: { 
              id: req.params.id 
            }
        }
      );
    } catch (err) {
      return handleError.HTTP_ERROR_INTERNAL(err,res);
    }

    return res.status(HttpStatusCodes.OK).json(result);
  }
}

module.exports = SlideController;