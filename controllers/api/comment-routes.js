const router = require("express").Router();
const { User, Comment, Post } = "../../models";

//Get comment by id
router.get("/:id", async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
        },
        {
          model: BlogPost,
          attributes: ["blogPost_id"],
        },
        {
          model: User,
          attributes: ["user_id"],
        },
      ],
    });
    if (!commentData) {
      res.status(404).json({ message: "No comment found with that id." });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
//Create a new comment
router.post("/", async (req, res) => {
  try {
    const commentData = await Comment.create({
      Comment_body: req.body.Comment_body,
    });
    res.status(200).json(commentData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//Update a blog post by its id
router.put("/:id", async (req, res) => {
  try {
    const commentData = await Comment.update(
      {
        comment_body: req.body.comment_body,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!commentData) {
      res.status(404).json({ message: "No comment found with this id." });
      return;
    }
    console.log(commentData);
    res.status(200).json(commentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Delete a comment by its id
router.delete("/:id", async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!commentData) {
      res.status(404).json({ message: "No comment found with that id." });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
