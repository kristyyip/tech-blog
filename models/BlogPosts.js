const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config');

class BlogPosts extends Model {}
  
BlogPosts.init(
{
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    creatorID: {
        type: DataTypes.INTEGER,
        references: {
            model: "user",
            key: "id",
        },
        allowNull: false,
    },
    comments:  {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: "[]"
    }
},
{    
    sequelize,
    modelName: 'blogPosts',
}
);

module.exports = BlogPosts;
