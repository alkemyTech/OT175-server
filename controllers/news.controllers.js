const models = require("./../models");
const { News } = models;
const HttpStatus = require("../common/handleError");


class NewsCtrl {
  
  async createNews(req, res) {
    const { name, content, image, categoryId } = req.body;
    try {
      const news = await News.create({ name, content, image, categoryId });
      return HttpStatus.HTTP_CREATE(res, news);
    } catch (err) {
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

    const { id } = req.params;
    const { name, content, image } = req.body;

    const article = await News.findOne({ where: { id } });
    if ( !article ) return HttpStatus.HTTP_NOT_FOUND(res);

    article.update({ name, content, image });
    return HttpStatus.HTTP_OK(res, "article successfully updated");

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
