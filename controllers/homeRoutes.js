const router = require("express").Router();
const { User, BlogPost, Comment } = require("../models");
const withAuth = require("../utils/auth");

//Get all blog posts
router.get("/", async (req, res) => {
  try {
    const blogPostData = await BlogPost.findAll({
      include: [
        {
          model: BlogPost,
        },
        {
          model: Comment,
          attributes: ["blogPost_id"],
        },
        {
          model: User,
          attributes: ["user_name"],
        },
      ],
    });

    //Serialize data so the template can read it
    const users = blogPostData.map((blogPost) => blogPost.get({ plain: true }));

    //Pass serialized data and session flag into template
    res.render("homepage", {
      BlogPost,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const blogPostData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: BlogPost,
        },
        {
          model: Comment,
          attributes: ["post_id"],
        },
        {
          model: User,
          attributes: ["user_name"],
        },
      ],
    });
    const project = blogPostData.get({ plain: true });

    res.render("blogPost", {
      ...BlogPost,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
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

module.exports = router;
