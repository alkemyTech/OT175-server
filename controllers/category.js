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
  async list(req, res) {
    const defaultValue = await Category.findAll({ offset: 0, limit: 10 });
    if( !req.query.page ) return res.status(HttpStatusCodes.OK).json({ defaultValue });
    const { page } = req.query;
    const categories = await Category.findAll({ offset: parseInt( (page - 1) * 10 ), limit: 10});

    if( !categories.length ) return res.status(HttpStatusCodes.NOT_FOUND).json({msg:'categories not found'});

    let back = parseInt( page ) -1;
    const next = parseInt( page ) +1
    if( back === 0) {
      back = 1;
    }

    res.status(HttpStatusCodes.OK).json({ 
      back: `${process.env.HOST}/categories?page=${ back }`, 
      next: `${process.env.HOST}/categories?page=${ next }`, 
      categories
    });
  }

  async update(req, res) {
    const{id}= req.params
    const { name, description, image } = req.body;
    const targetCat = await Category.findByPk(id);
    if (
      isString(name) &&
      isString(description) &&
      isUrl(image) && targetCat
    ){
      return Category.update(
        { name, description, image },
        {
          where: { id },
        }
      )
        .then(async() => {
          const updated = await Category.findByPk(id)
          res.status(HttpStatusCodes.OK).json(updated)
        })
        .catch(err =>
          res.status(HttpStatusCodes.BAD_REQUEST).json(err.message)
        );
    }else{
      res.status(HttpStatusCodes.BAD_REQUEST).send('invalid datarypes or wrong id')
    }
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
