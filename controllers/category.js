const models = require('../models');
const { Category } = models;
const HttpStatusCodes = require('../common/httpCodes');
const {
  HTTP_ERROR_INTERNAL,
  HTTP_BAD_REQUEST,
  HTTP_NOT_FOUND,
  HTTP_OK
} = require('../common/handleError');

const resAllItems =
  'add a name, a description of type string and an url for image';
const updateOk = 'successful update';
const deleteOk = 'successful delete';
const resType = 'add a valid data type';

const validateUrl = (url) => {
  const RegExp =
    /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  return RegExp.test(url);
};
const typeString = (data) => {
  return typeof data === 'string';
};

const typeNumber = (data) => {
  return typeof data === 'number';
};

const isString = (data) => {
  return data ? typeString(data) : true;
};
const isNumber = (data) => {
  return data ? typeNumber(data) : false;
};
const isUrl = (data) => {
  return data ? validateUrl(data) : true;
};
class CategoryController {
  create(req, res) {
    const { name, description, image } = req.body;
    if (typeString(name) && typeString(description) && validateUrl(image)) {
      return Category.findOrCreate({
        where: { name },
        defaults: { name, description, image }
      })
        .then((category) => res.status(HttpStatusCodes.CREATED).send(category))
        .catch((err) =>
          res.status(HttpStatusCodes.BAD_REQUEST).send(err.message)
        );
    } else {
      res.status(HttpStatusCodes.BAD_REQUEST).send(resAllItems);
    }
  }
  async list(req, res) {
    const page = req.query.page ? parseInt(req.query.page) : 0;

    let host = process.env.HOST ? process.env.HOST : 'localhost';
    let port = process.env.PORT ? process.env.PORT : '3000';

    const limit = 10; //to do: unhardcode this

    const categories = await Category.findAndCountAll({
      attributes: {
        exclude: [
          'id',
          'description',
          'image',
          'deleted',
          'createdAt',
          'updatedAt'
        ]
      },
      offset: page * limit,
      limit: limit
    });

    if (!categories.rows.length)
      return res
        .status(HttpStatusCodes.NOT_FOUND)
        .json({ msg: 'No categories found in this page and/or in database' });

    let backPage = page === 0 ? 0 : page - 1;

    let nextPage = (page + 1) * limit < categories.count ? page + 1 : page;

    res.status(HttpStatusCodes.OK).json({
      backPage: host + ':' + port + '/categories?page=' + backPage,
      nextPage: host + ':' + port + '/categories?page=' + nextPage,
      categories: categories.rows
    });
  }

  async update(req, res) {
    const { id } = req.params;
    const { name, description, image } = req.body;
    const targetCat = await Category.findByPk(id);
    if (isString(name) && isString(description) && isUrl(image) && targetCat) {
      return Category.update(
        { name, description, image },
        {
          where: { id }
        }
      )
        .then(async () => {
          const updated = await Category.findByPk(id);
          res.status(HttpStatusCodes.OK).json(updated);
        })
        .catch((err) =>
          res.status(HttpStatusCodes.BAD_REQUEST).json(err.message)
        );
    } else {
      res
        .status(HttpStatusCodes.BAD_REQUEST)
        .send('invalid datarypes or wrong id');
    }
  }

  remove(req, res) {
    const { id } = req.body;
    if (isNumber(id)) {
      return Category.destroy({
        where: { id }
      })
        .then((category) => res.status(HttpStatusCodes.OK).send(deleteOk))
        .catch((err) =>
          res.status(HttpStatusCodes.BAD_REQUEST).send(err.message)
        );
    } else res.status(HttpStatusCodes.BAD_REQUEST).send(resType);
  }

  async findCategory(req, res) {
    const { id } = req.params;

    let category;
    try {
      category = await Category.findByPk(id);
    } catch (error) {
      HTTP_ERROR_INTERNAL(err, res);
    }
    if (!category) {
      return HTTP_NOT_FOUND(res);
    }
    HTTP_OK(res, category);
    return category;
  }
}
module.exports = new CategoryController();
