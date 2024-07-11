const { BlogPosts } = require('../models');

module.exports = {
	add: async (req, res) => {
		const tempData = {
			title: req.body.title,
			content: req.body.content,
			creatorID: req.body.userId
		};
		console.log(req.session.user_id)
		const blogData = await BlogPosts.create(tempData);
		res.json(blogData);
	},
	getAll: async (req, res) => {
		try {
            const blogData = await BlogPosts.findAll();
            res.json(blogData);
        } catch (err) {
            res.status(500).json(err);
        }
	},
	getUserPosts: async (req, res) => {
		try {
            const blogData = await BlogPosts.findAll({
				where: {
					creatorID: req.session.user_id
				}	
			})
            res.json(blogData);
        } catch (err) {
            res.status(500).json(err);
        }
	},
};