const Installation = require("./installation");
const Utils = require("../../config/utils");
const userModel = require("../users/User");
const userService = require("../users/services");
let schoolModel = require("../schools/School");
const schoolService = require("../schools/services");

const md5 = require("md5");
const errHandler = (err) => {
  console.log("Error:", err);
};

module.exports = {
  doInstallation: async (reqBody) => {
    //check whether any user with this email address exists
    const userByEmail = await userService.getNumberOfUserByEmail(reqBody.email);

    if (userByEmail > 0) {
      return await Utils.returnResult(
        "Installation",
        false,
        "Email already exists"
      );
    }

    console.log("reqBody", reqBody);

    let password = md5(reqBody.password);
    delete reqBody.password;

    //prepare School entity
    schoolModel = reqBody;

    const resSet = await schoolService.createSchool(schoolModel);

    if (!resSet) {
      return await Utils.returnResult(
        "Installation",
        false,
        "SchoolIdentity or email already exists"
      );
    }

    //prepare User entity

    userModel.userName = resSet.primaryContactPerson;
    userModel.email = resSet.email;
    userModel.password = password;
    userModel.schoolId = resSet.schoolId;
    userModel.roleId = 1;

    const userResSet = await userService.createUser(userModel);

    if (!userResSet) {
      return await Utils.returnResult(
        "Installation",
        false,
        "Email already exists"
      );
    } else {
      return await Utils.returnResult("Installation", userResSet);
    }
  },
};
