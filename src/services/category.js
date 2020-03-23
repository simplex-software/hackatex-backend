'use strict';

const { Category } = require('../models');

class CategoryService {
  async getCategories()
  {
    const categories = await Category.findAll();
    return categories.map(category => {
      return {
        id: category.id,
        name: category.name
      }
    });
  }
}

module.exports = CategoryService;