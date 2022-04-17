const models = require("../models");
const { Category } = models;
const HttpStatusCodes = require('../common/httpCodes');

const resAllItems =
  "add a name, a description of type string and an url for image";
const updateOk = "successful update";
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
        .then(category => res.status(201).send(category))
        .catch(err => res.status(400).send(err.message));
    } else {
      res.status(200).send(resAllItems);
    }
  }
  list(_, res) {
    return Category.findAll({})
      .then(categories => res.status(201).send(categories))
      .catch(err => res.status(400).send(err.message));
  }

  update(req, res) {
    const { name, description, image, id } = req.body;
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
        .then(category => res.status(201).send(updateOk))
        .catch(err => res.status(400).send(err.message));
    } else res.status(200).send(resType);
  }

  remove() {}
}
module.exports = new CategoryController();
