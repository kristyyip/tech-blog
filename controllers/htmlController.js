const { BlogPosts } = require('../models');

module.exports = {
	homepage: async (req, res) => {
		const blogPosts = await BlogPosts.findAll({ 
            include: ['user'], 
            order: [['id', 'DESC'],] 
        });
		const posts = blogPosts.map((post) => post.get({ plain: true }));

		res.render('homepage', { posts, logged_in: req.session.logged_in });
	},

	login: async (req, res) => {
        res.render('login', {logged_in: req.session.logged_in});
    },

	signup: async (req, res) => {
		res.render('signup', {logged_in: req.session.logged_in});
	},

    dashboard: async (req, res) => {
        const blogPosts = await BlogPosts.findAll({
            where: {creatorID: req.session.user_id},
            order: [['id', 'ASC'],]
        });
		const posts = blogPosts.map((post) => post.get({ plain: true }));

		res.render('dashboard', {posts, logged_in: req.session.logged_in});
	},
};