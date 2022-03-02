const Sequelize = require("sequelize");
const sequelize = require("../../dbconn/connection");

const permsModel = require("../permissions/permissions");
// var rolePerms = sequelize.define("assigned_permissionto_roles", {
module.exports = sequelize.define("assigned_permissionto_roles", {
  assignedId: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
  },
  roleId: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
  },
  permissionId: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
  },
});
