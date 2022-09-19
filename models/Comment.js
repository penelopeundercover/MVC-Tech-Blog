const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },

    body: {
      type: DataTypes.STRING,
    },
    // post_id: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   references: {
    //     model: "blogpost",
    //     key: "id",
    //   },
    // },
    // user_id: {
    //   type: DataTypes.STRING,
    //   references: {
    //     model: "user",
    //     key: "id",
    //   },
    // },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "comment",
  }
);

module.exports = Comment;
