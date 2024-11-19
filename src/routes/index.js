const { Router } = require("express");
const router = Router();

const docsRouter = require("../components/Docs/route");

const ApiRouter = (app) => {
  app.use("/", router);
  router.use("/docs", docsRouter);
};

module.exports = ApiRouter;
