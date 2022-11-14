const router = require("express").Router();
const { BlogPost } = require("../../models");
const withAuth = require("../../utils/auth");

//Get all blog posts
router.get("/", (req, res) => {
  BlogPost.findAll()
    .then((blogPostData) => res.json(blogPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Create a new post
// router.post("/", withAuth, async (req, res) => {
router.post("/", async (req, res) => {
  console.log("dinosaurs");
  console.log(req.body);
  try {
    const blogPostData = await BlogPost.create({
      ...req.body,
      // userId: req.session.userId,
      userId: 27,
    });
    res.json(blogPostData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Update a blog post by its id
router.put("/:id", withAuth, async (req, res) => {
  try {
    const blogPostData = await BlogPost.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!blogPostData) {
      res.status(404).json({ message: "No blog post found with this id." });
      return;
    }
    console.log(blogPostData);
    res.status(200).json(blogPostData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Delete a blog post by its id
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const blogPostData = await BlogPost.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!blogPostData) {
      res.status(404).json({ message: "No blog post found with that id." });
      return;
    }

    res.status(200).json(blogPostData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
