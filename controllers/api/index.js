const router = require("express").Router();
const userRoutes = require("./user-routes");
const commentRoutes = require("./comment-routes");
const blogPostRoutes = require("./blogPost-routes");

router.use("/users", userRoutes);
router.use("/comments", commentRoutes);
router.use("/blogPosts", blogPostRoutes);

module.exports = router;
