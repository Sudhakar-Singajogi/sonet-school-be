const express = require("express");
const router = express.Router();
const { joiMiddleware } = require("../../initializer/framework");
const Utils = require("../../config/utils");
const assignSubServ = require("./services");
const { jwtAuthorise } = require("../../services/jwt-auth-authorize");

router.get(
  "/",
  jwtAuthorise("assignedsubjects", "read"),
  async (req, res, next) => {
    const schoolId = req.user.schoolId;
  }
);

router.delete(
  "/unassign/:subjectId/:classId",
  jwtAuthorise("assignedsubjects", "delete"),
  async (req, res) => {
    let subjectId = req.params.subjectId;
    const schoolId = req.user.schoolId;
    const classId = req.params.classId;
    var obj = {
      subjectId,
      schoolId,
      classId,
    };
    var resultSet = await assignSubServ.unAssignSubject(obj);
    await Utils.retrunResponse(res, resultSet);
  }
);

module.exports = router;
