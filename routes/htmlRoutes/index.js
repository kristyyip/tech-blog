const router = require("express").Router();
const { htmlController } = require("../../controllers");

router.route("/").get(htmlController.homepage);
router.route("/login").get(htmlController.login)
router.route("/signup").get(htmlController.signup)
router.route("/dashboard").get(htmlController.dashboard)

module.exports = router;