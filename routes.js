const routes = require("next-routes");

module.exports = routes()
  .add("/campaign/new", "/campaigns/new")
  .add("/campaign/:address", "/campaigns/details");
