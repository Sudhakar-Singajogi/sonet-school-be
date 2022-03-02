const Utils = require("../../config/utils");
const rolePerModel = require("./rolepermissions");
const perModel = require("../permissions/permissions");
const permService = require("../permissions/services");

const featureModel = require("../features/features");

rolePerModel.belongsTo(perModel, {
  through: "permissionId",
  foreignKey: "permissionId",
});

const PerAssoc = {
  model: perModel,
  attributes: {
    exclude: ["permissionId", "name", "createdAt", "updatedAt"],
  },
};

module.exports = {
  getRoleBasedFeatures: async (roleId) => {
    const roleBasedFeatures = await rolePerModel.findAll({
      where: { roleId: roleId },
      include: [PerAssoc],
      attributes: {
        exclude: ["permissionId", "assignedId", "createdAt", "updatedAt"],
      },
    });

    return roleBasedFeatures ? roleBasedFeatures : [];
  },
};
