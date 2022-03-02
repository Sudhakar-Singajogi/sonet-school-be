const Joi = require("joi");
const utils = require("../../config/utils");

const createAssign = Joi.object().keys({
  schoolId: Joi.number().required().greater(0),
  subjects: Joi.array()
    .items(
      Joi.object()
        .keys({
          subjectName: Joi.string().required(),
        })
        .required()
    )
    .required(),
  assignedClasses: Joi.array()
    .items(
      Joi.object().keys({
        className: Joi.string().required(),
        classId: Joi.number().required().greater(0),
      })
    )
    .optional(),
});

const assignSubjectToClass = Joi.object().keys({
  assignSubjects: Joi.array()
    .items(
      Joi.object()
        .keys({
          subjectName: Joi.string().required(),
          subjectId: Joi.number().required(),
          classId: Joi.number().required().greater(0),
          className: Joi.string().required(),
        })
        .required()
    )
    .required(),
});

const editSubject = Joi.object().keys({
  updateSubjects: Joi.array().items(
    Joi.object().keys({
      subjectId: Joi.number().required(),
      subjectName: Joi.string().optional(),
      status: Joi.string().optional(),
    })
  ),
});

const schemas = {
  createAssign,
  assignSubjectToClass,
  editSubject,
};
module.exports = schemas;
