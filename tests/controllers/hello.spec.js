const mongoose = require('mongoose');
const request = require('supertest');

const app = require('../../app');
const User = require('../../src/models/user');
const config = require('../../config/config');
const createPasswordHelper = require('../../src/helpers/create-password');
const signJwt = require('../../src/helpers/sign-jwt');

describe('Example endpoint', () => {
  let token;
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

    token = signJwt('testing name', 'test@mail.com');
  });

  it('Hello, World!', async (done) => {
    const res = await request(app)
      .get('/api/v1/hello')
      .send()
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200, { message: 'Hello, World!'})
      .then(() => {
        done();
      });
  });

  afterAll(async () => {
    await mongoose.connection.db.dropCollection('users');
    await mongoose.disconnect();
  });
});