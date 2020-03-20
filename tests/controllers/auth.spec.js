const mongoose = require('mongoose');
const request = require('supertest');

const app = require('../../app');
const User = require('../../src/models/user');
const config = require('../../config/config');
const createPasswordHelper = require('../../src/helpers/create-password');

describe('Testing Login', () => {
  beforeAll(async () => {
    await mongoose.connect(config.test.database.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const password = createPasswordHelper('testing');

    await User.create({
      name: 'testing name',
      email: 'test@mail.com',
      username: 'test',
      password: password
    });
  });

  it('Successful login', async (done) => {
    await request(app)
      .post('/api/v1/auth/login')
      .send({
        username: 'test',
        password: 'testing'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(() => {
        done();
      });
  }, 10000);

  it('Invalid password', async (done) => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        username: 'test',
        password: 'invalid'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401, {
        error: 'Invalid username or password.'
      })
      .then(() => {
        done();
      });
  }, 10000);

  it('Invalid username', async (done) => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        username: 'invalid',
        password: 'testing'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401, {
        error: 'Invalid username or password.'
      })
      .then(() => {
        done();
      });
  }, 10000);

  afterAll(async () => {
    await mongoose.connection.db.dropCollection('users');
    await mongoose.disconnect();
  });
});