const router = require("express").Router();
const { htmlController } = require("../../controllers");
const { withAuth } = require("../../utils/Auth");

router.route("/").get(htmlController.homepage);
router.route("/login").get(htmlController.login)
router.route("/signup").get(htmlController.signup)
router.route("/dashboard").get(withAuth, htmlController.dashboard)

module.exports = router;