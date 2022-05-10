'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User, { as: 'user' });
      Post.hasMany(models.Comment, {
        foreignKey: 'postId',
        as: 'comments',
      });
    }
  }
  Post.init(
    {
      title: DataTypes.STRING,
      body: DataTypes.STRING,
      image: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Post',
      paranoid: true,
    }
  );
  return Post;
};
