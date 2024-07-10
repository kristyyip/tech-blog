const { userController } = require("../../controllers");
const router = require("express").Router();
const { withAuth } = require("../..utils/Auth");

router.route('/').post(userController.add).get(withAuth, userController.me);

router.route('/login').post(userController.login);
router.route('/logout').get(userController.logout);

module.exports = router;