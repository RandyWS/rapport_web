const Sequelize = require("sequelize");
const db = require("../db");
const moment = require("moment");

const types = [
  "phone-call",
  "text",
  "in-person",
  "social-media",
  "email",
  "letter",
  "other",
  "future",
];

const Communication = db.define("communication", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  content: {
    type: Sequelize.TEXT,
  },
  type: {
    type: Sequelize.STRING,
    validate: {
      isIn: [types],
    },
    defaultValue: "future",
  },
  start: {
    type: Sequelize.DATE,
    allowNull: false,
    get() {
      return moment(this.getDataValue("start")).format("llll");
    },
  },
  end: {
    type: Sequelize.DATE,
    allowNull: false,
    get() {
      return moment(this.getDataValue("end")).format("llll");
    },
  },
  is_recurring: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Communication;
