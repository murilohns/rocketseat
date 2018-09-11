const { Project } = require('../models');

const index = async (req, res, next) => {
  try {
    const projects = await Project.findAll({
      where: {
        UserId: req.session.user.id,
      },
    });

    return res.render('dashboard/index', { projects });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  index,
};
