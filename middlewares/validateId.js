const models = require("../models");
const { News } = models;
const HttpStatusCodes = require("../common/httpCodes");



module.exports = async function (req, res, next) {
    const { id } = parseInt(req.params)
    req.news = await News.findByPk(id)
    
    if (req.news == null) return res.status(HttpStatusCodes.NOT_FOUND).send('News not found')
    
    next()
  }
