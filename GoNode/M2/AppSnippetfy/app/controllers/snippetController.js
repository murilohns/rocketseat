const { Category, Snippet } = require('../models');

const store = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    const snippet = await Snippet.create({
      ...req.body,
      CategoryId: categoryId,
    });

    req.flash('success', 'Snippet criado com sucesso');
    return res.redirect(`/app/categories/${categoryId}/snippets/${snippet.id}`);
  } catch (err) {
    return next(err);
  }
};

const update = async (req, rest, next) => {
  try {
    const { id, categoryId } = req.params;
    const snippet = await Snippet.findById(id);

    await snippet.update(req.body);

    req.flash('success', 'Snippet atualizado com sucesso!');

    return rest.redirect(`/app/categories/${categoryId}/snippets/${id}`);
  } catch (err) {
    return next(err);
  }
};

const destroy = async (req, rest, next) => {
  try {
    await Snippet.destroy({ where: { id: req.params.id } });

    req.flash('success', 'Snippet deletado com sucesso!');

    return rest.redirect(`/app/categories/${req.params.categoryId}`);
  } catch (err) {
    return next(err);
  }
};

const show = async (req, res, next) => {
  try {
    const { categoryId, snippetId } = req.params;

    const categories = await Category.findAll({
      include: [Snippet],
      where: {
        UserId: req.session.user.id,
      },
    });

    const snippets = await Snippet.findAll({
      where: { CategoryId: categoryId },
    });

    const snippet = await Snippet.findById(snippetId);

    return res.render('snippets/show', {
      activeCategory: categoryId,
      categories,
      snippets,
      currentSnippet: snippet,
    });
  } catch (err) {
    return next(err);
  }
};
module.exports = {
  store,
  show,
  update,
  destroy,
};
