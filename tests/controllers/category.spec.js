const request = require('supertest');
const assert = require('assert');
const app = require('../../app');
const {Category, Event} = require('../../src/models');

describe('Category Endpoints', () => {
  beforeEach(async () => {
    await Category.destroy({where: {}});
  });

  describe('/api/v1/categories', () => {
    it('should return an empty array when there is no category', async () => {
      let response = await request(app)
        .get('/api/v1/categories')
        .expect(200);
      assert.equal(response.body.success, true);
      assert.deepStrictEqual(response.body.categories, []);
    });
  
    it('should return all existing categories', async () => {
      let c1 = await Category.create({name: 'category1', description: 'description1'});
      let c2 = await Category.create({name: 'category2', description: 'description2', image: 'image2'});
  
      let response = await request(app)
        .get('/api/v1/categories')
        .expect(200);
      
      assert.equal(response.body.success, true);
      assert.equal(response.body.categories.length, 2);
      let sortedCategories = response.body.categories.sort((a,b) => a.name > b.name ? 1 : -1);
  
      assert.deepStrictEqual(sortedCategories, [{name: 'category1', id: c1.id}, {name: 'category2', id: c2.id}]);
    });
  });

  describe('/api/v1/categories/:id/events', () => {
    it('should return an empty array if there is no events in the category', async () => {
      let c1 = await Category.create({name: 'category1', description: 'description1'});
      let response = await request(app)
        .get(`/api/v1/categories/${c1.id}/events`)
        .expect(200);
      assert.equal(response.body.success, true);
      assert.deepStrictEqual(response.body.events, []);
    });

    it('should return a 400 if the category id is invalid', async () => {
      let c1 = await Category.create({name: 'category1', description: 'description1'});
      let response = await request(app)
        .get(`/api/v1/categories/${c1.id + 1}/events`)
        .expect(400);
      assert.equal(response.body.success, false);
    });
  
    it('should only return events belonging to the category', async () => {
      let c1 = await Category.create({name: 'category1', description: 'description1'});
      let c2 = await Category.create({name: 'category2', description: 'description2', image: 'image2'});
      let e1 = await Event.create({name: 'event1', start_date: new Date(), category_id: c1.id});
      let e2 = await Event.create({name: 'event2', start_date: new Date(), category_id: c2.id});

      let events = await c1.getEvents();
      
      let response = await request(app)
        .get(`/api/v1/categories/${c1.id}/events`)
        .expect(200);
      assert.equal(response.body.success, true);
      assert.equal(response.body.events.length, 1);
      assert.equal(response.body.events[0].name, 'event1');
    });


  });
  
});