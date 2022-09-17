const router = require("express").Router();
const { User, Post } = require("../models");
const withAuth = require("../utils/auth");

router.get('/', async(req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: Post,
                    attributes: ['title'],
                },
                {
                    model: Comment,
                    attributes: ['comment_id']
                }
            ],
        
        });

        //Serialize data so the template can read it
        const users = userData.map((user) => user.get({ plain: true}))
    }
})
