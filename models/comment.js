'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.Post);
      Comment.belongsTo(models.User);
    }
  }
  Comment.init(
    {
      userId: DataTypes.INTEGER,
      body: DataTypes.TEXT,
      postId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Comment',
      paranoid: true
    }
  );
  return Comment;
};
