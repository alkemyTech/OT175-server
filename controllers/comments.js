const models = require('../models');
const { Comment, Role } = models;
const jwt = require('jsonwebtoken');
const httpCodes = require('../common/httpCodes');
const handleError = require('../common/handleError');
const HttpStatus = require("../common/handleError");

class CommentController {
  static async updateCommentById(req, res) {
    const { id } = req.params;
    const { body } = req.body;

    try {
      const token = req.headers.authorization.split(' ')[1];
      if (!token) return res.json({ msg: 'no token in request' });
      const jwtDecoded = jwt.verify(token, process.env.JWT_SECRET);

      const comment = await Comment.findOne({ where: { id } });
      const { name } = await Role.findOne({ where: { id: jwtDecoded.roleId } });

      if (!comment)
        return res
          .status(httpCodes.NOT_FOUND)
          .json({ msg: 'Comment not found' });

      if (comment.userId !== jwtDecoded.id && name !== 'Admin')
        return res
          .status(httpCodes.INTERNAL_SERVER_ERROR)
          .json({ msg: 'Acess denied' });

      comment.update({ body });

      res.status(httpCodes.OK).json({ msg: 'Comment updated' });
    } catch (err) {
      return handleError.HTTP_ERROR_INTERNAL(err, res);
    }
  }
  static async getAllComments(req, res) {
    let comments;
    try {
      comments = await Comment.findAll({
        order: [['createdAt', 'ASC']],
        attributes:['body']
      });
    } catch (err) {
      return handleError.HTTP_ERROR_INTERNAL(err, res);
    }
    return HttpStatus.HTTP_OK(res, comments);
  }
}

module.exports = CommentController;
