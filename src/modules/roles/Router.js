const express = require("express");
const router = express.Router();
const { joiMiddleware } = require("../../initializer/framework");
const Utils = require("../../config/utils");

router.get("/", async (req, res, next) => {
  return res.status(200).json({
    result: "OK",
    resultCode: 200,
    message: 'Hurry, i will fecth the roles for you',
    ValidationErrors: "",
    data: [],
    totalRows: 0,
  });
});

module.exports = router;
