const { Project, Section } = require('../models');

const index = async (req, res, next) => {
  try {
    const project = await Project.findOne({
      where: {
        id: req.params.id,
      },
    });

    const sections = await Section.findAll({
      include: [Project],
      where: {
        ProjectId: project.id,
      },
    });

    return res.render('projects/show', { project, sections });
  } catch (err) {
    return next(err);
  }
};

const store = async (req, res, next) => {
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
