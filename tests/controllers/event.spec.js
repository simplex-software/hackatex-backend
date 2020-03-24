const request = require('supertest');
const assert = require('assert');
const app = require('../../app');
const { Category, Event } = require('../../src/models');
const { EventService } = require('../../src/services');

describe('Event Endpoints', () => {
  beforeEach(async () => {
    await Event.destroy({ where: {} });
  });

  describe('/api/v1/events', () => {
    it('should return an empty array when there is no events', async () => {
      let response = await request(app)
        .get('/api/v1/events')
        .expect(200);
      assert.equal(response.body.success, true);
      assert.deepStrictEqual(response.body.events, []);
    });

    it('should return all existing events', async () => {
      const eventService = new EventService();
      let c1 = await Category.create({ name: 'category1', description: 'description1' });
      let c2 = await Category.create({ name: 'category2', description: 'description2', image: 'image2' });
      await Event.create({ name: 'event1', start_date: new Date(), category_id: c1.id });
      await Event.create({ name: 'event2', start_date: new Date(), category_id: c2.id });

      let response = await request(app)
        .get('/api/v1/events')
        .expect(200);

      assert.equal(response.body.success, true);
      assert.equal(response.body.events.length, 2);
      let sortedEvents = response.body.events.sort((a, b) => a.name > b.name ? 1 : -1);

      const events = await Event.findAll({ raw: true });
      const result = events.map(event => {
        return eventService.formatEventResponse(event);
      });

      assert.deepStrictEqual(sortedEvents, result);
    });

    it('should return only the first event', async () => {
      const eventService = new EventService();
      let c1 = await Category.create({ name: 'category1', description: 'description1' });
      let c2 = await Category.create({ name: 'category2', description: 'description2', image: 'image2' });
      await Event.create({ name: 'first', start_date: new Date(), category_id: c1.id });
      await Event.create({ name: 'second', start_date: new Date(), category_id: c2.id });

      let response = await request(app)
        .get('/api/v1/events')
        .query({ search: 'first' })
        .expect(200);

      assert.equal(response.body.success, true);
      assert.equal(response.body.events.length, 1);
      let sortedEvents = response.body.events.sort((a, b) => a.name > b.name ? 1 : -1);

      const events = await Event.findAll({ raw: true , where: { name: 'first' }});
      const result = events.map(event => {
        return eventService.formatEventResponse(event);
      });

      assert.deepStrictEqual(sortedEvents, result);
    });

    it('should return empty array with big page number', async () => {
      const eventService = new EventService();
      let c1 = await Category.create({ name: 'category1', description: 'description1' });
      let c2 = await Category.create({ name: 'category2', description: 'description2', image: 'image2' });
      await Event.create({ name: 'first', start_date: new Date(), category_id: c1.id });
      await Event.create({ name: 'second', start_date: new Date(), category_id: c2.id });

      let response = await request(app)
        .get('/api/v1/events')
        .query({ page: 1000 })
        .expect(200);

      assert.equal(response.body.success, true);
      assert.equal(response.body.events.length, 0);

      assert.deepStrictEqual(response.body.events, []);
    });

    it('should return a 404 if event id does not exist', async () => {
      let c1 = await Category.create({ name: 'category1', description: 'description1' });
      await Event.create({ name: 'first', start_date: new Date(), category_id: c1.id });
      const lastId = await Event.max('id'); 

      let response = await request(app)
        .get(`/api/v1/events/${lastId + 1000}`)
        .expect(404);

      assert.equal(response.body.success, false);
      assert.equal(response.body.error, 'Invalid event ID.');
    });

    it('should return an event', async () => {
      const eventService = new EventService();
      let c1 = await Category.create({ name: 'category1', description: 'description1' });
      const e1 = await Event.create({ name: 'first', start_date: new Date(), category_id: c1.id });

      const rawEvent = await Event.findByPk(e1.id, { raw: true });

      let response = await request(app)
        .get(`/api/v1/events/${e1.id}`)
        .expect(200);

      assert.equal(response.body.success, true);
      assert.deepStrictEqual(response.body.event, eventService.formatEventResponse(rawEvent));
    });
  });
});