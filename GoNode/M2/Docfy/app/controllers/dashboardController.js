const { Project } = require('../models');

const index = async (req, res) => {
  try {
    const projects = await Project.findAll({
      where: {
        UserId: req.session.user.id,
      },
    });

    return res.render('dashboard/index', { projects });
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  index,
};
