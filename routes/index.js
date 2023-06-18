// const middleware = require("../middleware");

const routers = app => {
  // List of available Routes
  app.use("/auth", require("./Auth"));
  app.use("/users", require("./Users"));
  app.use("/tasks", require("./Tasks"));
  app.use("/chats", require("./Chats"));
  app.use("/messages", require("./Messages"));
  // app.use(middleware.notFound);
  // app.use(middleware.errorHandler);
};

module.exports = routers;
