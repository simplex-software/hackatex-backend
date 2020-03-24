const { EventService } = require('../services');

module.exports = {
  async getEvents(req, res, next) {
    const search = req.query.search || null;
    const page = req.query.page || 1;

    try {
      const eventService = new EventService();
      const data = await eventService.getEventsList(search, page);

      res.json({ success: true, events: data });
    } catch(err) {
      next(err);
    }
  },

  async getEventDetails(req, res, next) {
    const eventId = req.params.id;

    try {
      const eventService = new EventService();
      const data = await eventService.getEventDetails(eventId);

      res.json({ success: true, event: data });
    } catch(err) {
      next(err);
    }
  }
};