const { blogController } = require("../../controllers");
const { withAuth } = require("../../utils/Auth");

const router = require("express").Router()

router.route("/").post(withAuth, blogController.add);
router.route("/").get(blogController.getAll);
router.route("/:id").get(blogController.getOne);
router.route("/:id").put(blogController.updatePost)
router.route("/:id").delete(blogController.deletePost)

module.exports = router;