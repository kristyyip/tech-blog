const router = require("express").Router();
const { htmlController } = require("../../controllers");

router.route("/").get(htmlController.homepage);
router.route("/login").get(htmlController.signup)

module.exports = router;