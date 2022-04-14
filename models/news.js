const {Sequelize, Model, DataTypes} = require('sequelize');

class News extends Model{
    static associate(db){
        this.belongsTo(db.Categories,{as:'category'})
        //aclarar con estefany si es one-to-many o many-to-many 
    }
};

const NewsSchema = {
    id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name:{
        allowNull:false,
        type: DataTypes.STRING
    },
    content:{
        allowNull:false,
        type: DataTypes.TEXT
    },
    image:{
        allowNull: false,
        type: DataTypes.STRING
    },
    categoryId:{
        allowNull:false,
        type: DataTypes.INTEGER
    }
}

News.init(
    NewsSchema
    ,{
    sequelize,
    modelName: 'News',
    freezeTableName: true
});

module.exports= (NewsSchema, News);

