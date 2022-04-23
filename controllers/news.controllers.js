const models = require("./../models");
const { News, Category } = models;
const HttpStatus = require("../common/handleError");
const ValidateByDataType = require("../common/validateByDataType");

class NewsCtrl {
  constructor() {}

  async createNews(req, res) {
    const { name, content, image, categoryId } = req.body;

    const targetCat = await Category.findByPk(categoryId)
     if (
      ValidateByDataType.validateString(name) &&
      ValidateByDataType.validateString(content) &&
      ValidateByDataType.validateUrl(image) &&
      ValidateByDataType.validateNumber(categoryId) &&
      targetCat
    ) {
      try {
        const news = await News.create({ name, content, image, categoryId });
        return HttpStatus.HTTP_CREATE(res, news);
      } catch (err) {
        return HttpStatus.HTTP_BAD_REQUEST(res);
      }
    } else {
      return HttpStatus.HTTP_BAD_REQUEST(res);
    }
  }

  async getAll(req, res) {
    try {
      const articles = await News.findAll({
        where: { deletedAt: null },
        include: "category",
      });
      if (articles.length === 0) {
        return res.status(404).send("News is empty");
      }
      return res.status(200).json(articles);
    } catch (err) {
      console.error(err);
      return res.status(500).send("internal server error. could not get News");
    }
  }
  async getOne(req, res) {
    try {
      const { id } = req.params;

      const article = await News.findByPk(id, { include: "category" });

      if (!article) {
        return res.status(404).send("article not found");
      } else {
        return res.json(article);
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send("internal server error. could not get News");
    }
  }
  async getByCategory(req, res) {
    try {
      const { id } = req.params;

      const articles = await News.findAll({
        where: { category_id: id },
      });

      if (!articles) {
        return res.status(404).send("No articles found");
      } else {
        return res.json(articles);
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send("internal server error. could not get News");
    }
  }
  async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;

      if(data.categoryId){
        const targetCat= await Category.findByPk(data.categoryId);
        if(!targetCat){
          return HttpStatus.HTTP_BAD_REQUEST(res)
        }
      }

      const article = News.update(data, {
        where: { id: id },
      });

      if (!article) {
        return res.status(404).send("article not found");
      } else {
        const modifiedArticle = await News.findByPk(id);
        return res.status(200).json(modifiedArticle);
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send("internal server error. could not get News");
    }
  }
  async deleteOne(req, res) {
    try {
      const { id } = req.params;

      News.destroy({
        where: { id: id },
      })
        .then(() => {
          return res.status(200).send("article successfully deleted");
        })
        .catch(err => {
          console.error(err);
          return res.status(404).send("article not found");
        });
    } catch (err) {
      console.error(err);
      return res.status(500).send("internal server error. could not get News");
    }
  }
}

module.exports = NewsCtrl;
