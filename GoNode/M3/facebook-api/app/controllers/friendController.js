const mongoose = require('mongoose');
const { indexOf } = require('ramda');

const User = mongoose.model('User');

const addFriend = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      res.status(400).json({ error: 'Usuário não encontrado' });
    }

    const friends = indexOf(req.userId, user.friends);
    if (friends !== -1) {
      res.status(400).json({ error: 'Você já é amigo desse usuário' });
    }

    if (id === req.userId) {
      res.status(400).json({ error: 'Você não pode se adicionar' });
    }

    user.friends.push(req.userId);

    await user.save();

    const me = await User.findById(req.userId);

    me.friends.push(id);

    await me.save();

    return res.json(me);
  } catch (err) {
    return next(err);
  }
};

const deleteFriend = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    const me = await User.findById(req.userId);

    if (!user) {
      res.status(400).json({ error: 'Usuário não encontrado' });
    }

    const friends = indexOf(id, me.friends);

    if (friends === -1) {
      res.status(400).json({ error: 'Você não são amigos' });
    }

    me.friends.splice(friends);

    await me.save();

    user.friends.splice(indexOf(req.userId, user.friends));

    await user.save();

    return res.json(me);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  addFriend,
  deleteFriend,
};
