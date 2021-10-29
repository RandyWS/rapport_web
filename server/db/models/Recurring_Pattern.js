const Sequelize = require('sequelize');
const db = require('../db')

//https://www.vertabelo.com/blog/again-and-again-managing-recurring-events-in-a-data-model/

const Recurring_Pattern = db.define('recurring_pattern', {
  separation_count: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 2,
    },
  },
  day_of_week: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 6,
    },
  },
  week_of_month: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: {
      min: 1,
      max: 4,
    },
  },
});

module.exports = Recurring_Pattern;
