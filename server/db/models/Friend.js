const Sequelize = require("sequelize");
const db = require("../db");

const Friend = db.define("friend", {
  nickname: {
    type: Sequelize.STRING,
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.TEXT,
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      "https://media.istockphoto.com/vectors/ecology-r-letter-logo-with-green-leaf-vector-id1257065672?k=20&m=1257065672&s=612x612&w=0&h=jANYJdbMDCENpHJuKkdH4bqF4O-n1xC6U4yhvdBY4_M=",
    validate: {
      isUrl: true,
    },
  },
});

// sets default value if image is empty string
Friend.beforeValidate((friend, options) => {
  if (options.fields.includes("imageUrl")) {
    if (friend.imageUrl === "") {
      friend.imageUrl =
        "https://dejpknyizje2n.cloudfront.net/marketplace/products/realistic-drawing-of-an-otter-sticker-1590543174.2700732.png";
    }
  }
});

module.exports = Friend;
