const routes = require("next-routes");

module.exports = routes()
  .add("/campaign/new", "/campaigns/new")
  .add("/campaign/:address", "/campaigns/details")
  .add("/campaign/:address/requests", "/campaigns/requests/list")
  .add("/campaign/:address/requests/new", "campaigns/requests/new");
