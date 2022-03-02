const express = require("express");
const router = express.Router();
const { joiMiddleware } = require("../../initializer/framework");
const Utils = require("../../config/utils");
const subServ = require("./services");
const { jwtAuthorise } = require("../../services/jwt-auth-authorize");
const { createAssign, assignSubjectToClass, editSubject } = require("./Schema");

const assignSubSer = require("../assignedsubjects/services");

router.post(
  "/createAssign",
  jwtAuthorise("subjects", "write"),
  joiMiddleware(createAssign, "createAssignSubjects"),
  async (req, res, next) => {
    var resultSet = await assignSubSer.createAssignSubjects(req.body);
    await Utils.retrunResponse(res, resultSet);
  }
);

router.post(
  "/assign",
  jwtAuthorise("assignedsubjects", "write"),
  joiMiddleware(assignSubjectToClass, "assignSubjectToClass"),
  async (req, res, next) => {
    var resultSet = await assignSubSer.assignSubjectToClass(req);
    await Utils.retrunResponse(res, resultSet);
  }
);

router.patch(
  "/update",
  jwtAuthorise("subjects", "write"),
  joiMiddleware(editSubject, "updateSubjects"),
  async (req, res, next) => {
    const schoolId = req.user.schoolId;
    console.log("schoolId is:", req.user.schoolId);
    var resultSet = await subServ.updateSubjects(req);
    await Utils.retrunResponse(res, resultSet);
  }
);

router.delete(
  "/:subjectId",
  jwtAuthorise("subjects", "delete"),
  async (req, res) => {
    let subjectId = req.params.subjectId;
    const schoolId = req.user.schoolId;
    var obj = {
      subjectId,
      schoolId,
    };
    var resultSet = await subServ.deleteSubject(obj);
    await Utils.retrunResponse(res, resultSet);
  }
);

router.get("/", jwtAuthorise("subjects", "read"), async (req, res, next) => {
  const schoolId = req.user.schoolId;
  console.log("schoolId:", req.user.schoolId);
  // var resultSet = await stdServ.createNewStudents(req.body);
  // await Utils.retrunResponse(res, resultSet);
});

module.exports = router;
