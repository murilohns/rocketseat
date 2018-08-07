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
    return next();
  }
};
module.exports = {
  store,
  show,
};
