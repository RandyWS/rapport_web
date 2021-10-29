const db = require("./db");

const User = require("./models/User");
const Friend = require("./models/Friend");
const Communication = require("./models/Comm");
const Recurring_Pattern = require("./models/Recurring_Pattern");
const Recurring_Type = require("./models/Recurring_Type");

User.hasMany(Friend, { foreignKey: "userId" });
Friend.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Communication, { foreignKey: "userId" });
Communication.belongsTo(User, { foreignKey: "userId" });

Friend.hasMany(Communication, { foreignKey: "friendId" });
Communication.belongsTo(Friend, { foreignKey: "friendId" });

Communication.hasOne(Recurring_Pattern, { foreignKey: "commId" });
Recurring_Pattern.belongsTo(Communication, { foreignKey: "commId" });

Recurring_Type.hasMany(Recurring_Pattern, { foreignKey: "recurring_type_id" });
Recurring_Pattern.belongsTo(Recurring_Type, {
  foreignKey: "recurring_type_id",
});

module.exports = {
  db,
  models: {
    User,
    Friend,
    Communication,
    Recurring_Pattern,
    Recurring_Type,
  },
};
