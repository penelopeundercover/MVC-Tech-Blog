const router = require("express").Router();
const { User, BlogPost, Comment } = require("../../models");

//Get all blog posts
router.get("/", async (req, res) => {
  const blogPostData = await BlogPost.findAll({
    include: [
      {
        model: BlogPost,
      },

      {
        model: User,
        attributes: ["name"],
      },
    ],
  });
});

//Create a new post
router.post("/", async (req, res) => {
  try {
    const blogPostData = await BlogPost.create({
      blogPost_title: req.body.blogPost_title,
      blogPost_body: req.body.blogPost_body,
    });
    res.status(200).json(blogPostData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//Update a blog post by its id
router.put("/:id", async (req, res) => {
  try {
    const blogPostData = await BlogPost.update(
      {
        blogPost_title: req.body.blogPost_title,
        blogPost_body: req.body.blogPost_body,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
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
router.delete("/:id", async (req, res) => {
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
