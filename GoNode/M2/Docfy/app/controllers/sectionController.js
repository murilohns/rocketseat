const { Section, Project } = require('../models');

const index = async (req, res, next) => {
  try {
    const { projectId, sectionId } = req.params;

    const sections = await Section.findAll({
      include: [Project],
      where: {
        ProjectId: projectId,
      },
    });
    const project = await Project.findById(projectId);

    const section = await Section.findById(sectionId);

    return res.render('sections/show', { project, section, sections });
  } catch (err) {
    return next(err);
  }
};

const createForm = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    const sections = await Section.findAll({
      include: [Project],
      where: {
        ProjectId: projectId,
      },
    });

    const project = await Project.findById(projectId);

    return res.render('sections/create', { project, sections });
  } catch (err) {
    return next(err);
  }
};

const store = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    const section = await Section.create({
      ...req.body,
      ProjectId: projectId,
    });

    req.flash('success', 'Seção criada com sucesso');
    return res.redirect(`/projects/${projectId}/sections/${section.id}`);
  } catch (err) {
    return next(err);
  }
};

const destroy = async (req, res, next) => {
  const { sectionId, projectId } = req.params;
  try {
    await Section.destroy({
      where: {
        id: sectionId,
      },
    });

    req.flash('success', 'Seção deletada com sucesso');
    return res.redirect(`/projects/${projectId}`);
  } catch (err) {
    return next(err);
  }
};

const update = async (req, res, next) => {
  const { sectionId, projectId } = req.params;
  try {
    const section = await Section.findById(sectionId);

    await section.update(req.body);

    req.flash('success', 'Seção editada com sucesso');
    return res.redirect(`/projects/${projectId}/sections/${sectionId}`);
  } catch (err) {
    return next(err);
  }
};

const editForm = async (req, res, next) => {
  try {
    const { sectionId, projectId } = req.params;

    const section = await Section.findById(sectionId);

    const sections = await Section.findAll({
      include: [Project],
      where: {
        ProjectId: projectId,
      },
    });

    const project = await Project.findById(projectId);

    return res.render('sections/edit', { project, sections, section });
  } catch (err) {
    return next(err);
  }
};
module.exports = {
  createForm,
  index,
  store,
  destroy,
  update,
  editForm,
};
