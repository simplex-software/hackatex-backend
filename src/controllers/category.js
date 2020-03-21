const { Category } = require('../models');

module.exports = {
  getCategories: async function(req, res, next) {
    const categories = await Category.findAll();
    const data = categories.map(category => {
      return {
        id: category.id,
        name: category.name
      }
    });

    return res.json({ success: true, categories: data});
  }
};