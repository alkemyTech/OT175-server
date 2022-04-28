'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
  };Contact.init({
    name:{
        allowNull:false,
        type: DataTypes.STRING
    },
    phone:{
        allowNull:false,
        type: DataTypes.INTEGER
    },
    email:{
        allowNull: false,
        type: DataTypes.STRING
    },
    message:{
        allowNull:false,
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'Contact',
    paranoid: true
  });
  return Contact;
};