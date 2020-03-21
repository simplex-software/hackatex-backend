const { CategoryService } = require('../services');

module.exports = {
  async getCategories(req, res, next) {
    const categoryService = new CategoryService();
    const data = await categoryService.getCategories();

    return res.json({ success: true, categories: data });
  },

  async getEventsByCategory(req, res, next) {
    const categoryId = req.params.categoryId;
    const page = req.query.page || 1;

    try {
      const eventService = new CategoryService();
      const data = await eventService.getAllByCategoryId(categoryId, page);

      return res.json({ success: true, events: data });
    } catch (err) {
      next(err);
    }
  }
}