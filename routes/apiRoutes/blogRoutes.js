const { blogController } = require("../../controllers");
const { withAuth } = require("../../utils/Auth");

const router = require("express").Router()

router.route("/").post(withAuth, blogController.add);
router.route("/").get(blogController.getAll);

module.exports = router;