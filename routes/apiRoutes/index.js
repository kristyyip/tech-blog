const router = require("express").Router();

const userRoutes = require("./userRoutes.js");
const blogRoutes = require("./blogRoutes.js");

router.get("/user", userRoutes);
router.get("/", blogRoutes)

module.exports = router;