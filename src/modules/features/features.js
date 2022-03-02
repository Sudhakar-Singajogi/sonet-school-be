const Sequelize = require("sequelize");
const sequelize = require("../../dbconn/connection");

module.exports = sequelize.define("Modules", {
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
