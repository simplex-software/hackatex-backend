const { auth } = require('../../src/middleware');

const signJwt = require('../../src/helpers/sign-jwt');

describe('JWT Middleware',() => {
  it('Successful validation', async () => {
    const token = signJwt('test', 'test@mail.com');
    const req = {
      headers: {
        authorization: `Bearer ${token}`
      }
    };
    const res = {};
    const next = jest.fn();

    auth(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it('No header sent', async () => {
    const req = {
      headers: {}
    };
    const res = {};
    const next = jest.fn();

    auth(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it('Invalid header format', async () => {
    const req = {
      headers: {
        authorization: 'abc'
      }
    };
    const res = {};
    const next = jest.fn();

    auth(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it('Invalid header value', async () => {
    const req = {
      headers: {
        authorization: 'Bearer abc'
      }
    };
    const res = {};
    const next = jest.fn();

    auth(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});