const router = require("express").Router();
const { User, BlogPost, Comment } = require("../models");
const withAuth = require("../utils/auth");

//Get all blog posts
router.get("/", async (req, res) => {
  try {
    const blogPostData = await BlogPost.findAll({
      include: [User],
    });

    //Serialize data so the template can read it
    const blogPosts = blogPostData.map((blogPost) =>
      blogPost.get({ plain: true })
    );

    console.log(blogPosts);

    //Pass serialized data and session flag into template
    res.render("blogPosts", {
      blogPosts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//If they're logged in, route to the homepage. If not, route to the login page.
router.get("/login", async (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

//If they're logged in, route to the homepage. If not, route to the signup page.
router.get("/signup", async (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

// Use withAuth middleware to prevent access to route
router.get("/profile", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render("profile", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

//Get one blog post by id
router.get("/blogPost/:id", async (req, res) => {
  try {
    const blogPostData = await BlogPost.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    if (!blogPostData) {
      res.status(404).json({ message: "No blog post found with that id." });
      return;
    }

    //Serialize data so the template can read it
    const blogPost = blogPostData.get({ plain: true });

    res.render("post", { blogPost });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
