const express = require("express");
const _ = require("lodash");
const modules = require("./appModules");
const { method } = require("lodash");
const Joi = require("joi");
const Utils = require("../config/utils");
const cors = require("cors");
/** Add the modules entity here */

const Sequelize = require("sequelize");
const sequelize = require("../dbconn/connection");

const applicationModules = sequelize.define("Modules", {
  moduleId: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
  },
  module: {
    type: Sequelize.STRING(300),
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM("1", "0"),
    allowNull: false,
    defaultValue: "0",
  },
});

const joiMiddleware = (schema, property = false) => {
  return async (req, res, next) => {
    const { error } = Joi.validate(req.body, schema);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");
      res.status(422).json({ error: message });
    }
  };
};

const connectRouters = (app) => {
  modules.modules.forEach((element) => {
    const currentElement = element.toLowerCase();
    console.log("currentElement: " + currentElement);

    if (currentElement == "kickstart" || currentElement == "installation") {
    } else {
      addNewModule(currentElement);
    }
    app.use(
      "/api/" + currentElement,
      require("../modules/" + currentElement + "/Router")
    );
  });
  // app.use(cors());
};

//to insert a new modules if not esists in the table
async function addNewModule(moduleName) {
  const resSet = await applicationModules
    .findOne({
      where: {
        module: moduleName,
      },
    })
    .catch((err) => {
      return Utils.catchError(moduleName, err);
    });
  console.log("asa" + resSet);
  if (resSet === null) {
    const newModule = {
      module: moduleName,
      status: 1,
    };
    await applicationModules.create(newModule);
  }
}

module.exports = {
  connectRouters,
  express,
  joiMiddleware,
};
