const router = require("express").Router();
const { Comment } = "../../models";
const withAuth = require("../../utils/auth");

//View all comments
router.get("/", (req, res) => {
  Comment.findAll()
    .then((commentData) => res.json(commentData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
//Create a new comment
router.post("/", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.create({
      ...req.body,
      userId: req.session.userId,
    });
    res.status(200).json(commentData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//Update a comment by its id
router.put("/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
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
router.delete("/:id", withAuth, async (req, res) => {
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
