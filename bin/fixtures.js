const Fixtures = require('node-mongodb-fixtures');

const { config } = require('../config');
const fixtures = new Fixtures({
  dir: `${config.app.dir}/src/fixtures`,
  mute: false
});

fixtures
  .connect(config.database.uri, { useUnifiedTopology: true })
  .then(() => fixtures.unload())
  .then(() => fixtures.load())
  .then(() => fixtures.disconnect())
  .then(() => console.log(`Ran all fixtures from ${config.app.dir}/src/fixtures`));
