module.exports = {
  hello: async function(req, res, next) {
    res.json({
      message: 'Hello, World!'
    });
  }
};