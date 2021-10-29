const Sequelize = require("sequelize");
const db = require("../db");

const Recurring_Type = db.define("recurring_type", {
  recurring_type: {
    type: Sequelize.ENUM("daily", "weekly", "monthly"),
    allowNull: false,
  },
});

module.exports = Recurring_Type;
