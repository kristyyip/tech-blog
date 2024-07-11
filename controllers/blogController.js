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

	getOne: async (req, res) => {
		try {
            const blogData = await BlogPosts.findByPk(req.params.id, {include: ['user']})
            res.json(blogData);
        } catch (err) {
            res.status(500).json(err);
        }
	},

	updatePost: async (req, res) => {
		// Calls the update method on the Book model
		BlogPosts.update(
			{
				// All the fields you can update and the data attached to the request body.
				title: req.body.title,
				content: req.body.content,
				comments: req.body.comments
			},
			{
			// Gets the post based on the id given in the request parameters
			where: {
				id: req.params.id,
			},
			}
		)
		.then((updatedPost) => {
			// Sends the updated post as a json response
			res.json(updatedPost);
		})
		.catch((err) => res.json(err));
	},
	
	deletePost: async (req, res) => {
		// Looks for the post based on id given in the request parameters and deletes the instance from the database
		BlogPosts.destroy({
			where: {
				id: req.params.id,
			},
		})
		.then((deletedPost) => {
			res.json(deletedPost);
		})
		.catch((err) => res.json(err));
	}
};