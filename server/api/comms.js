const router = require("express").Router();
const Sequelize = require("sequelize");
const {
  models: { User, Communication, Friend, Recurring_Pattern, Recurring_Type },
} = require("../db");
const jwt = require("jsonwebtoken");
const moment = require("moment");
module.exports = router;

const secret = process.env.JWT;

const authRequired = async (req, res, next) => {
  const token = req.headers.authorization;

  try {
    const { id } = await jwt.verify(token, secret);
    req.userId = id;
  } catch (error) {
    res.status(401).send({
      loggedIn: false,
      message: "Unauthorized",
    });
    return;
  }
  next();
};

router.get("/", authRequired, async (req, res, next) => {
  try {
    if (req.userId) {
      const comm = await Communication.findAll({
        where: {
          userId: req.userId,
        },
        order: [["start", "ASC"]],
        include: {
          model: Friend,
        },
      });

      if (comm.length) {
        const formattedComms = comm.map((comm) => {
          const start = moment(comm.start).format("YYYY-MM-DD hh:mm");
          const end = moment(comm.end).format("YYYY-MM-DD hh:mm");

          return comm;
        });

        res.status(200).json(formattedComms);
      }
    }
  } catch (error) {
    next(error);
  }
});

router.get("/timeline", authRequired, async (req, res, next) => {
  try {
    if (req.userId) {
      const comm = await Communication.findAll({
        where: {
          userId: req.userId,
          type: {
            [Sequelize.Op.not]: "future",
          },
        },
        order: [["start", "DESC"]],
        include: {
          model: Friend,
        },
      });

      if (comm.length) {
        const formattedComms = comm.map((comm) => {
          const start = moment(comm.start).format("YYYY-MM-DD hh:mm");
          const end = moment(comm.end).format("YYYY-MM-DD hh:mm");

          return comm;
        });

        res.status(200).json(formattedComms);
      }
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", authRequired, async (req, res, next) => {
  try {
    if (req.userId) {
      const newComm = await Communication.create({
        userId: req.userId,
        friendId: req.body.friendId,
        ...req.body,
      });

      res.status(200).send({
        newComm,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.get("/recurring/:friendId", authRequired, async (req, res, next) => {
  try {
    if (req.userId) {
      const recurring = await Recurring_Pattern.findAll({
        where: {
          friendId: req.params.friendId,
          userId: req.userId,
        },
        include: { model: Recurring_Type },
      });

      res.status(200).send({
        recurring,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/recurring/:friendId", authRequired, async (req, res, next) => {
  try {
    if (req.userId) {
      // gets the next closest date
      function nextDay(x) {
        let now = moment(req.body.time);
        if (moment().isoWeekday() <= x) {
          return moment(now).isoWeekday(x);
        } else {
          return moment(now).add(1, "weeks").isoWeekday(x);
        }
      }

      const startDate = nextDay(req.body.weekDay);

      let firstDay = startDate.clone();
      let lastDay = startDate.clone().add(1, "years");

      let interval = "";
      let separation_count = 0;
      let count = 1;
      let recurringType = 1;
      if (req.body.frequency === "daily") {
        interval = "days";
        recurringType = 1;
      } else if (req.body.frequency === "weekly") {
        interval = "weeks";
        recurringType = 2;
      } else if (req.body.frequency === "bi-weekly") {
        interval = "weeks";
        count = 2;
        recurringType = 2;
        separation_count = 1;
      } else {
        interval = "weeks";
        recurringType = 3;
        count = 4;
      }

      const recurring = await Recurring_Pattern.create({
        friendId: req.params.friendId,
        userId: req.userId,
        recurring_type_id: recurringType,
        day_of_week: req.body.weekDay,
        separation_count,
      });

      let recurringEvents = [];

      for (
        let i = moment(firstDay);
        i.isBefore(lastDay);
        i.add(count, interval)
      ) {
        recurringEvents.push({
          recurringId: recurring.id,
          userId: req.userId,
          friendId: req.params.friendId,
          is_recurring: true,
          title: `${req.body.friend}`,
          type: "future",
          start: i.clone(),
          end: i.clone().add(1, "hours"),
        });
      }

      const newComm = await Promise.all(
        recurringEvents.map(async (contact) => {
          let comm = await Communication.create(contact);

          return comm;
        })
      );

      res.status(200).send({
        newComm,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:commId", authRequired, async (req, res, next) => {
  try {
    if (req.userId) {
      const comm = await Communication.findOne({
        where: {
          userId: req.userId,
          id: req.params.commId,
        },
      });

      if (comm.id) {
        res.status(200).json(comm);
      }
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:commId", authRequired, async (req, res, next) => {
  try {
    if (req.userId) {
      const comm = await Communication.findOne({
        where: {
          userId: req.userId,
          friendId: req.body.friendId,
          id: req.params.commId,
        },
      });

      if (comm.id) {
        const editedComm = await comm.update(req.body);
        res.status(200).json(editedComm);
      }
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:commId", authRequired, async (req, res, next) => {
  try {
    if (req.userId) {
      const deleteCount = await Communication.destroy({
        where: { userId: req.userId, id: req.params.commId },
      });
      res.status(200).json(deleteCount);
    }
  } catch (err) {
    next(err);
  }
});
