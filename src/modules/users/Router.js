const express = require("express");
const router = express.Router();
const { joiMiddleware } = require("../../initializer/framework");
const Utils = require("../../config/utils");
const { installationSchema } = require("./Schema");
const {
  jwtAuthenticate,
  jwtAuthorise,
} = require("../../services/jwt-auth-authorize");
const { validateUserLogin } = require("./Schema");
const userServ = require("./services");

router.get(
  "/school/:id",
  jwtAuthorise("schools", "read"),
  async (req, res, next) => {
    const schoolId = req.params.id;
    var resultSet = await userServ.getUsers(schoolId);
    await Utils.retrunResponse(res, resultSet);
  }
);

router.post(
  "/login",
  joiMiddleware(validateUserLogin),
  jwtAuthenticate(),
  async (req, res, next) => {}
);

module.exports = router;
