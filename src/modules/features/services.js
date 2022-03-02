const Utils = require("../../config/utils");
const featuresmodel = require("./features");
const sequelize = require("../../dbconn/connection");

module.exports = {
  getfeatures: async (reqBody) => {
    const allFeature = await Utils.findAll({ model: featuresmodel });
    return allFeature;
  },
  getUnAssingedFeaturetoPermission: async (schoolId) => {
    let qry =
      "select moduleId, module  from modules where  modules.module not IN(SELECT modl.module from modules as modl left join permissions as per on per.moduleId=modl.moduleId  where per.schoolId=:schoolId)";
    await Utils.loglastExecuteQueryToWinston(
      "schools",
      qry.replace(":schoolId", schoolId)
    );

    return await sequelize
      .query(qry, {
        replacements: { schoolId: schoolId },
        type: sequelize.QueryTypes.SELECT,
      })
      .then((unAssignedFeatures) => {
        return {
          message: "Query Success",
          result: unAssignedFeatures,
          totalRows: unAssignedFeatures.length,
        };
      });
  },
};
