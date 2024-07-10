const BlogPosts = require("./BlogPosts");
const User = require("./Users");

User.hasMany(BlogPosts, {
    foreignKey: "creatorID",
    onDelete: "CASCADE"
});

BlogPosts.belongsTo(User, {
    foreignKey: "creatorID"
});

module.exports = { BlogPosts, User }