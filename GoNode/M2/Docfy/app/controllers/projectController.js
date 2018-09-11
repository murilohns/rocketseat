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
    return next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);

    project.update(req.body);

    req.flash('success', 'Projeto atualizado com sucesso');
    return res.redirect(`/projects/${project.id}`);
  } catch (err) {
    return next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    await Project.destroy({
      where: {
        id: req.params.id,
      },
    });

    req.flash('success', 'Projeto deletado com sucesso');
    return res.redirect('/dashboard');
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  index,
  store,
  update,
  destroy,
};
