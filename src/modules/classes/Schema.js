const Joi = require("joi");
const createNewClass = Joi.object().keys({
  className: Joi.string().required(),
  assignSections: Joi.array()
    .items(
      Joi.object().keys({
        sectionId: Joi.number().optional(),
        sectionName: Joi.string().required(),
      })
    )
    .optional(),
});

const editAClass = Joi.object().keys({
  className: Joi.string().optional(),
  status: Joi.string().optional(),
});

const schemas = {
  createNewClass,
  editAClass,
};
module.exports = schemas;
