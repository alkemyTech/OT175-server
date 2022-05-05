'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.User, {as: 'user'});
    }
  }
  Post.init({
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    image: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Post',
    paranoid: true
  });
  return Post;
};