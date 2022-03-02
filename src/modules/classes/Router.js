const express = require("express");
const router = express.Router();
const { joiMiddleware } = require("../../initializer/framework");
const Utils = require("../../config/utils");
const classesServ = require("./services");
const { createNewClass, editAClass } = require("./Schema");
const { jwtAuthorise } = require("../../services/jwt-auth-authorize");
let clsModel = require("./classes");

router.get(
  "/:offset?/:limit?",
  jwtAuthorise("schools", "read"),
  async (req, res, next) => {
    const schoolId = req.user.schoolId;
    let offset = 0;
    let limit = 10;
    if (req.params.offset) {
      offset = req.params.offset;
      limit = req.params.limit;
    }

    var resultSet = await classesServ.getClassesBySchool(
      schoolId,
      offset,
      limit
    );
    await Utils.retrunResponse(res, resultSet);
  }
);

router.post(
  "/create",
  jwtAuthorise("classes", "write"),
  joiMiddleware(createNewClass),
  async (req, res, next) => {
    const schoolId = req.user.schoolId;
    console.log("schoolId:", req.user.schoolId);

    clsModel = req.body;
    clsModel.schoolId = schoolId;

    if (req.body.hasOwnProperty("assignSections")) {
      clsModel.className = req.body.className;
      clsModel.assignedSections = req.body.assignSections;
    }

    var resultSet = await classesServ.createNewClass(clsModel);
    await Utils.retrunResponse(res, resultSet);
  }
),
  router.patch(
    "/update/:classId",
    jwtAuthorise("classes", "write"),
    joiMiddleware(editAClass),
    async (req, res, next) => {
      const schoolId = req.user.schoolId;
      clsModel = req.body;
      clsModel.schoolId = schoolId;
      clsModel.classId = req.params.classId;
      console.log("classId", clsModel.classId);

      var resultSet = await classesServ.updateAClass(clsModel);
      await Utils.retrunResponse(res, resultSet);
    }
  );

module.exports = router;
