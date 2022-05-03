const models = require("./../models");
const { News } = models;
const HttpStatus = require("../common/handleError");

class NewsCtrl {
  async create(req, res) {
    try {
      const data = req.body;

      const article = await News.create(data);
      return res.status(200).json(article);
    } catch (err) {
      console.error(err);
      return res.status(500).send("internal server error. could not create");
    }
  }
  async getAll(req, res) {
    let articles;
    try {
      articles = await News.findAll({
        where: { deletedAt: null },
      });
    } catch (err) {
      return HttpStatus.HTTP_ERROR_INTERNAL(res);
    }
    if (!articles.length) {
      return HttpStatus.HTTP_NOT_FOUND(res);
    }
    return HttpStatus.HTTP_OK(res, articles);
  }
  async getNewById(req, res) {
    const { id } = req.params;
    let article;
    try {
      article = await News.findByPk(id);
    } catch (err) {
      return HttpStatus.HTTP_ERROR_INTERNAL(res);
    }
    if (article) {
      return HttpStatus.HTTP_OK(res, article);
    } else {
      return HttpStatus.HTTP_NOT_FOUND(res);
    }
  }
  async getByCategory(req, res) {
    let articles;
    const { id } = req.params;
    try {
      articles = await News.findAll({
        where: { category_id: id },
      });
    } catch (err) {
      return HttpStatus.HTTP_ERROR_INTERNAL(res);
    }
    if (!articles) {
      return HttpStatus.HTTP_NOT_FOUND(res);
    } else {
      return HttpStatus.HTTP_OK(res, article);
    }
  }
  async update(req, res) {
    const { id } = req.params;
    const data = req.body;
    let modifiedArticle;
    try {
      const article = News.update(data, {
        where: { id: id },
      });
    } catch (err) {
      return HttpStatus.HTTP_ERROR_INTERNAL(res);
    }
    if (!article) {
      return HttpStatus.HTTP_NOT_FOUND(res);
    } else {
      modifiedArticle = await News.findByPk(id);
      return HttpStatus.HTTP_OK(res, article);
    }
  }
  async deleteOne(req, res) {
    const { id } = req.params;
    try {
      News.destroy({
        where: { id: id },
      })
        .then(() => {
          return HttpStatus.HTTP_OK(res, "article successfully deleted");
        })
        .catch(err => {
          return HttpStatus.HTTP_NOT_FOUND(res);
        });
    } catch (err) {
      return HttpStatus.HTTP_ERROR_INTERNAL(res);
    }
  }
}

module.exports = NewsCtrl;


