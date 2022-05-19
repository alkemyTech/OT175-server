const models = require('./../models');
const { News } = models;
const HttpStatus = require('../common/handleError');

class NewsCtrl {
  static async createNews(req, res) {
    const { name, content, image, categoryId } = req.body;
    try {
      const news = await News.create({ name, content, image, categoryId });
      return HttpStatus.HTTP_CREATE(res, news);
    } catch (err) {
      return HttpStatus.HTTP_BAD_REQUEST(res);
    }
  }

  static async getAll(req, res) {
    let { page } = req.query;
    page = parseInt(page);

    let quantityOfRecordsPerPage = 10; //to do: unhardcode this
    let initialRecord = page * quantityOfRecordsPerPage;

    try {
      let articles = await News.findAndCountAll({
        where: { deletedAt: null },

        offset: initialRecord,
        limit: quantityOfRecordsPerPage,

        include: 'Category'
      });
      if (!articles) {
        return res
          .status(404)
          .send('News and/or the page requested has no records');
      }

      let previousPage = page === 0 ? 0 : page - 1;

      let quantityOfRecordsInTable = articles.count;

      let nextPage =
        initialRecord + quantityOfRecordsPerPage < quantityOfRecordsInTable
          ? page + 1
          : page;

      let port = process.env.PORT ? process.env.PORT : '3000';
      let host = process.env.HOST ? process.env.HOST : 'localhost:' + port;

      return res.status(200).json({
        urlPreviousPage: host + req.baseUrl + '?page=' + previousPage,
        records: articles.rows,
        urlNextPage: host + req.baseUrl + '?page=' + nextPage
      });
    } catch (err) {
      //console.error(err);
      return res.status(500).send('internal server error. could not get News');
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;

      const article = await News.findByPk(id, { include: 'category' });

      if (!article) {
        return res.status(404).send('article not found');
      } else {
        return res.json(article);
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send('internal server error. could not get News');
    }
  }
  async getByCategory(req, res) {
    try {
      const { id } = req.params;

      const articles = await News.findAll({
        where: { category_id: id }
      });

      if (!articles) {
        return res.status(404).send('No articles found');
      } else {
        return res.json(articles);
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send('internal server error. could not get News');
    }
  }
  async update(req, res) {
    const { id } = req.params;
    const { name, content, image } = req.body;

    const article = await News.findOne({ where: { id } });
    if (!article) return HttpStatus.HTTP_NOT_FOUND(res);

    article.update({ name, content, image });
    return HttpStatus.HTTP_OK(res, 'article successfully updated');
  }
  async deleteOne(req, res) {
    const { id } = req.params;
    try {
      News.destroy({
        where: { id: id }
      })
        .then(() => {
          return HttpStatus.HTTP_OK(res, 'article successfully deleted');
        })
        .catch((err) => {
          return HttpStatus.HTTP_NOT_FOUND(res);
        });
    } catch (err) {
      return HttpStatus.HTTP_ERROR_INTERNAL(res);
    }
  }
}

module.exports = NewsCtrl;
