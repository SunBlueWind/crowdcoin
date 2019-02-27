const next = require("next");
const routes = require("./routes");
const { createServer } = require("http");
require("dotenv").config();
const app = next({ dev: process.env.NODE_ENV !== "production", quiet: false });
const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
  createServer(handler).listen(process.env.PORT || 8080, err => {
    if (err) throw error;
    console.log("Application started");
  });
});
