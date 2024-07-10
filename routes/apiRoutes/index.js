const router = require("express").Router();

const userRoutes = require("./userRoutes.js");
const blogRoutes = require("./blogRoutes.js");

router.use("/user", userRoutes);
router.use("/blog", blogRoutes)

module.exports = router;