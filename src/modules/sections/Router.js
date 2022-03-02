const express = require("express");
const router = express.Router();
const { joiMiddleware } = require("../../initializer/framework");
const Utils = require("../../config/utils");
const sectionsServ = require("./services");
const {
  createSection,
  editASection,
  assignSections,
  unAssignSections,
} = require("./Schema");
const { jwtAuthorise } = require("../../services/jwt-auth-authorize");
let secModel = require("./Sections");
const assignedSecServ = require("../assignedSections/Services.js");

router.post(
  "/create",
  jwtAuthorise("sections", "write"),
  joiMiddleware(createSection, "createSection"),
  async (req, res, next) => {
    req.body.schoolId = req.user.schoolId;
    const reqObj = req.body;
    var resultSet = await sectionsServ.createNewSection(reqObj);
    await Utils.retrunResponse(res, resultSet);
  }
),
  router.patch(
    "/update",
    joiMiddleware(editASection, "editSections"),
    jwtAuthorise("sections", "write"),
    async (req, res, next) => {
      req.body.schoolId = req.user.schoolId;
      secModel = req.body;
      var resultSet = await sectionsServ.updateASection(secModel);
      await Utils.retrunResponse(res, resultSet);
    }
  );
router.get("/", jwtAuthorise("sections", "read"), async (req, res, next) => {
  console.log(req.query);
  const schoolId = req.user.schoolId;
  let offset = 0;
  let limit = 10;

  if (req.query.offset) {
    offset = req.query.offset;
    if (req.query.limit) {
      limit = req.query.limit;
    }
  }

  var resultSet = await sectionsServ.getAllSections(schoolId, offset, limit);

  await Utils.retrunResponse(res, resultSet);
});

router.get(
  "/assigned/:classId?",
  jwtAuthorise("sections", "read"),
  async (req, res, next) => {
    var cond = {};
    cond.schoolId = req.user.schoolId;

    if (req.params.classId) {
      cond.classId = req.params.classId;
    }

    var assignedssections = await assignedSecServ.getAssignedSections(cond);
    if (assignedssections.resultSet.length == 0) {
      const resultSet = await Utils.returnResult(
        "Assigned Sections",
        false,
        "No records found"
      );
      await Utils.retrunResponse(res, resultSet);
    }
    var totalRows = assignedssections.resultSet.totalRows;
    delete assignedssections.resultSet.totalRows;
    const resultSet = await Utils.returnResult(
      "classes",
      assignedssections.resultSet,
      null,
      assignedssections.resultSet.length
    );
    resultSet.totalRows = totalRows;

    await Utils.retrunResponse(res, resultSet);
  }
);

router.post(
  "/assign",
  joiMiddleware(assignSections, "assignSections"),
  jwtAuthorise("sections", "write"),
  async (req, res, next) => {
    req.body.schoolId = req.user.schoolId;

    var resultSet = await assignedSecServ.assignSections(req.body);
    await Utils.retrunResponse(res, resultSet);
  }
);

router.post(
  "/unassign",
  joiMiddleware(unAssignSections, "unassiunAssignSectionsgnSections"),
  jwtAuthorise("sections", "write"),
  async (req, res, next) => {
    req.body.schoolId = req.user.schoolId;
    var resultSet = await assignedSecServ.unassignSections(req.body);
    await Utils.retrunResponse(res, resultSet);
  }
);

module.exports = router;
