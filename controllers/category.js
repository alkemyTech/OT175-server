const models = require("../models");
const { Category } = models;
const HttpStatusCodes = require("../common/httpCodes");

const resAllItems =
  "add a name, a description of type string and an url for image";
const updateOk = "successful update";
const deleteOk = "successful delete";
const resType = "add a valid data type";

const validateUrl = url => {
  const RegExp =
    /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  return RegExp.test(url);
};
const typeString = data => {
  return typeof data === "string";
};

const typeNumber = data => {
  return typeof data === "number";
};

const isString = data => {
  return data ? typeString(data) : true;
};
const isNumber = data => {
  return data ? typeNumber(data) : false;
};
const isUrl = data => {
  return data ? validateUrl(data) : true;
};
class CategoryController {
  create(req, res) {
    const { name, description, image } = req.body;
    if (typeString(name) && typeString(description) && validateUrl(image)) {
      return Category.findOrCreate({
        where: { name },
        defaults: { name, description, image },
      })
        .then(category => res.status(HttpStatusCodes.CREATED).send(category))
        .catch(err =>
          res.status(HttpStatusCodes.BAD_REQUEST).send(err.message)
        );
    } else {
      res.status(HttpStatusCodes.BAD_REQUEST).send(resAllItems);
    }
  }
  list(_, res) {
    return Category.findAll({})
      .then(categories => res.status(HttpStatusCodes.OK).send(categories))
      .catch(err => res.status(HttpStatusCodes.BAD_REQUEST).send(err.message));
  }

  update(req, res) {
    const{id}= req.params
    const { name, description, image } = req.body;
    if (
      isString(name) &&
      isString(description) &&
      isNumber(id) &&
      isUrl(image)
    ) {
      return Category.update(
        { name, description, image },
        {
          where: { id },
        }
      )
        .then(category => res.status(HttpStatusCodes.OK).send(updateOk))
        .catch(err =>
          res.status(HttpStatusCodes.BAD_REQUEST).send(err.message)
        );
    } else res.status(HttpStatusCodes.BAD_REQUEST).send(resType);
  }

  remove(req, res) {
    const { id } = req.body;
    if (isNumber(id)) {
      return Category.destroy({
        where: { id },
      })
        .then(category => res.status(HttpStatusCodes.OK).send(deleteOk))
        .catch(err =>
          res.status(HttpStatusCodes.BAD_REQUEST).send(err.message)
        );
    } else res.status(HttpStatusCodes.BAD_REQUEST).send(resType);
  }
}
module.exports = new CategoryController();
