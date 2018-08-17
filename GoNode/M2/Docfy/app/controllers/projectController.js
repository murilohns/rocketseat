const { User } = require('../models');
const { Project } = require('../models');

const index = (req, res) => {
  try {
    const projects = Project.findAll({
      where: {
        UserId: req.session.user.id,
      },
    });

    res.render('/projects', { projects });
  } catch (err) {
    console.log(err);
  }
};

const store = async (req, res) => {
  try {
    const project = await Project.save({
      ...req.body,
      UserId: req.session.user.id,
    });

    req.flash('success', 'Projeto criado com sucesso');
    return res.redirect(`/app/dashboard/projects/${project.id}`);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  index,
  store,
};
