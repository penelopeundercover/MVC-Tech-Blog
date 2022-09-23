const sequelize = require("../config/connection");
const { User, BlogPost } = require("../models");

const UserData = require("./userData");
const blogPostData = require("./blogPostData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  console.log(UserData);
  console.log(User);
  const users = await User.bulkCreate(UserData, {
    individualHooks: true,
    returning: true,
  });

  const posts = await BlogPost.bulkCreate(blogPostData);

  process.exit(0);
};

seedDatabase();
