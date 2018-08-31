const { Project } = require('../models');

const index = async (req, res) => {
  try {
    const projects = await Project.findAll({
      where: {
        UserId: req.session.user.id,
      },
    });

    res.render('dashboard', { projects });
  } catch (err) {
    console.log(err);
  }
};

const store = async (req, res) => {
  try {
    const project = await Project.create({
      ...req.body,
      UserId: req.session.user.id,
    });

    req.flash('success', 'Projeto criado com sucesso');
    return res.redirect(`/projects/${project.id}`);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  index,
  store,
};
