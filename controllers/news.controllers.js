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
    try {
      const articles = await News.findAll({
        where: { deletedAt: null },
        include: "category",
      });
      if (!articles.length) {
        return HttpStatus.HTTP_NOT_FOUND(res);
      }
      return HttpStatus.HTTP_OK(res, articles);
    } catch (err) {
      return HttpStatus.HTTP_ERROR_INTERNAL(res);
    }
  }
  async getNewById(req, res) {
    const { id } = req.params;
    let article;
    try {
      article = await News.findByPk(id, { include: "category" });
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
    try {
      const { id } = req.params;

      const articles = await News.findAll({
        where: { category_id: id },
      });

      if (!articles) {
        return HttpStatus.HTTP_NOT_FOUND(res);
      } else {
        return HttpStatus.HTTP_OK(res, articles);
      }
    } catch (err) {
      console.error(err);
      return HttpStatus.HTTP_ERROR_INTERNAL(res);
    }
  }
  async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;

      const article = News.update(data, {
        where: { id: id },
      });

      if (!article) {
        return HttpStatus.HTTP_ERROR_INTERNAL(res);
      } else {
        const modifiedArticle = await News.findByPk(id);
        return HttpStatus.HTTP_OK(res, modifiedArticle);
      }
    } catch (err) {
      console.error(err);
      return HttpStatus.HTTP_ERROR_INTERNAL(res);
    }
  }
  async deleteOne(req, res) {
    try {
      const { id } = req.params;

      News.destroy({
        where: { id: id },
      })
        .then(() => {
          return HttpStatus.HTTP_OK(res, " deleted successed");
        })
        .catch(err => {
          console.error(err);
          return HttpStatus.HTTP_NOT_FOUND(res);
        });
    } catch (err) {
      console.error(err);
      return HttpStatus.HTTP_ERROR_INTERNAL(res);
    }
  }
}

module.exports = NewsCtrl;
