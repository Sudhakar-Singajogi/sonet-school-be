const express = require("express");
const router = express.Router();
const { joiMiddleware } = require("../../initializer/framework");
const Utils = require("../../config/utils");
const sectionsServ = require("./services");
const { createStudent, editStudent, profilePicUpdate } = require("./Schema");
const { jwtAuthorise } = require("../../services/jwt-auth-authorize");
let stdServ = require("./services");
const studentsModel = require("./Students");
const classModel = require("../classes/classes");

router.post(
  "/create",
  jwtAuthorise("students", "write"),
  joiMiddleware(createStudent, "createStudent"),
  async (req, res, next) => {
    const schoolId = req.user.schoolId;
    console.log("schoolId:", req.user.schoolId);
    var resultSet = await stdServ.createNewStudents(req.body);
    await Utils.retrunResponse(res, resultSet);
  }
);

router.patch(
  "/update/",
  joiMiddleware(editStudent),
  jwtAuthorise("students", "write"),
  async (req, res, next) => {
    const schoolId = req.user.schoolId;
    var resultSet = await stdServ.updateASection(req.body);
    await Utils.retrunResponse(res, resultSet);
  }
);

router.get("/", jwtAuthorise("students", "read"), async (req, res, next) => {
  var req = await stdServ.prepareParams(req, classModel);
  var resultSet = await stdServ.getStudents(req);
  await Utils.retrunResponse(res, resultSet);
});

router.post(
  "/uploadProfilePic",
  jwtAuthorise("students", "write"),
  joiMiddleware(profilePicUpdate),
  async (req, res, next) => {
    console.log(req.body.studentId);
    // res.send(req.files.ProfilePic)
    var resultSet = await stdServ.uploadProfilePic(req);
    await Utils.retrunResponse(res, resultSet);
  }
);

module.exports = router;
