const { Section } = require('../models');

const index = (req, res, next) => res.render('sections/show');

const createForm = (req, res, next) => res.render('sections/create');

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
