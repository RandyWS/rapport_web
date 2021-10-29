const router = require('express').Router();
const {User, Communication, Friend} = require('../db');
const jwt = require('jsonwebtoken');
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
      const friends = await Friend.findAll({
        where: {
          userId: req.userId,
        },
        include: [
          {
            model: Communication,
            order: ['date'],
          },
        ],
      });

      if (friends.length) {
        res.status(200).json(friends);
      }
    }
  } catch (error) {
    next(error);
  }
});

router.post('/', authRequired, async (req, res, next) => {
  try {
    if (req.userId) {
      const newFriend = await Friend.create({userId: req.userId, ...req.body});

      res.status(200).send({
        newFriend,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.get('/:friendId', authRequired, async (req, res, next) => {
  try {
    if (req.userId) {
      const friend = await Friend.findOne({
        where: {
          userId: req.userId,
          id: req.params.friendId,
        },
        include: [
          {
            model: Communication,
          },
        ],
      });
      console.log(friend);

      if (friend.id) {
        res.status(200).json(friend);
      }
    }
  } catch (error) {
    next(error);
  }
});

router.put('/:friendId', authRequired, async (req, res, next) => {
  try {
    if (req.userId) {
      const friend = await Friend.findOne({
        where: {
          userId: req.userId,
          id: req.params.friendId,
        },
      });

      if (friend.id) {
        const updatedFriend = await friend.update(req.body);
        res.status(200).json(updatedFriend);
      }
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/:friendId', authRequired, async (req, res, next) => {
  try {
    if (req.userId) {
      const deleteCommCount = await Communication.destroy({
        where: {userId: req.userId, friendId: req.params.friendId},
      });
      const deleteCount = await Friend.destroy({
        where: {userId: req.userId, id: req.params.friendId},
      });

      res.status(200).json(deleteCount);
    }
  } catch (err) {
    next(err);
  }
});
