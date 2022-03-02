const express = require("express");
const router = express.Router();
const { joiMiddleware } = require("../../initializer/framework");
const Utils = require("../../config/utils");
const serv = require("./services");
const installationEntity = require("./Installation");
const { installationSchema } = require("./Schema");

router.post("/", joiMiddleware(installationSchema), async (req, res, next) => {
  const resultSet = await serv.doInstallation(req.body);
  await Utils.retrunResponse(res, resultSet);
});

module.exports = router;
