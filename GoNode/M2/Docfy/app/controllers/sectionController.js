const { Section, Project } = require('../models');

const index = async (req, res, next) => {
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
};

const createForm = async (req, res, next) => {
  const { projectId } = req.params;

  const sections = await Section.findAll({
    include: [Project],
    where: {
      ProjectId: projectId,
    },
  });

  const project = await Project.findById(projectId);

  return res.render('sections/create', { project, sections });
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
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  createForm,
  index,
  store,
};
