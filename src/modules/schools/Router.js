const express = require("express");
const router = express.Router();
const { joiMiddleware } = require("../../initializer/framework");
const Utils = require("../../config/utils");
const { schoolSchema } = require("./Schema");

router.get("/", async (req, res, next) => {
  console.log("hey will fetch schools for you");
});

module.exports = router;
