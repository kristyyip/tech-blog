const { BlogPosts } = require('../models');

module.exports = {
	homepage: async (req, res) => {
		const blogPosts = await BlogPosts.findAll({ include: ['user'] });

		const posts = blogPosts.map((post) => post.get({ plain: true }));
		console.log(req.session.logged_in);
		res.render('homepage', { posts, logged_in: req.session.logged_in });
	},

	login: async (req, res) => {
        res.render('login', {logged_in: req.session.logged_in});
    },

	signup: async (req, res) => {
		res.render('signup', {logged_in: req.session.logged_in});
	},

    dashboard: async (req, res) => {
		res.render('dashboard', {logged_in: req.session.logged_in});
	},
};