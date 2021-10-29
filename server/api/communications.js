const router = require('express').Router();
const Sequelize = require('sequelize');
const {User, Communication, Friend, Recurring_Pattern} = require('../db');
const jwt = require('jsonwebtoken');
const moment = require('moment');
module.exports = router;

const secret = process.env.JWT;

const authRequired = async (req, res, next) => {
  const token = req.headers.authorization;

  try {
    const {id} = await jwt.verify(token, secret);
    req.userId = id;
  } catch (error) {
    res.status(401).send({
      loggedIn: false,
      message: 'Unauthorized',
    });
    return;
  }
  next();
};

router.get('/', authRequired, async (req, res, next) => {
  try {
    if (req.userId) {
      const comm = await Communication.findAll({
        where: {
          userId: req.userId,
        },
        order: [['start', 'ASC']],
        include: {
          model: Friend,
        },
      });

      if (comm.length) {
        res.status(200).json(comm);
      }
    }
  } catch (error) {
    next(error);
  }
});

router.post('/', authRequired, async (req, res, next) => {
  try {
    if (req.userId) {
      const newCommunication = await Communication.create({
        userId: req.userId,
        friendId: req.body.friendId,
        ...req.body,
      });

      res.status(200).send({
        newCommunication,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post('/recurring/:friendId', authRequired, async (req, res, next) => {
  try {
    if (req.userId) {
      // gets the next closest date
      function nextDay(x) {
        let now = moment(req.body.time);
        if (moment().isoWeekday() <= x) {
          return moment(now).isoWeekday(x);
        } else {
          return moment(now).add(1, 'weeks').isoWeekday(x);
        }
      }

      const startDate = nextDay(req.body.weekDay);

      let firstDay = startDate.clone();
      let lastDay = startDate.clone().add(1, 'years');

      let interval = '';
      let separation_count = 0;
      let count = 1;
      let recurringType = 1;
      if (req.body.frequency === 'daily') {
        interval = 'days';
        recurringType = 1;
      } else if (req.body.frequency === 'weekly') {
        interval = 'weeks';
        recurringType = 2;
      } else if (req.body.frequency === 'bi-weekly') {
        interval = 'weeks';
        count = 2;
        recurringType = 2;
        separation_count = 1;
      } else {
        interval = 'weeks';
        recurringType = 3;
        count = 4;
      }

      let recurringEvents = [];

      for (
        let i = moment(firstDay);
        i.isBefore(lastDay);
        i.add(count, interval)
      ) {
        recurringEvents.push({
          userId: req.userId,
          friendId: req.params.friendId,
          is_recurring: true,
          title: `${req.body.friend}`,
          type: 'future',
          start: i.clone(),
          end: i.clone().add(1, 'hours'),
        });
      }

      const newComm = await Promise.all(
        recurringEvents.map(async contact => {
          let comm = await Communication.create(contact);
          await Recurring_Pattern.create({
            commId: comm.id,
            recurring_type_id: recurringType,
            day_of_week: req.body.weekDay,
            separation_count,
          });
          return comm;
        }),
      );

      res.status(200).send({
        newComm,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.get('/:commId', authRequired, async (req, res, next) => {
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

router.delete('/:commId', authRequired, async (req, res, next) => {
  try {
    if (req.userId) {
      const deleteCount = await Communication.destroy({
        where: {userId: req.userId, id: req.params.commId},
      });
      res.status(200).json(deleteCount);
    }
  } catch (err) {
    next(err);
  }
});
