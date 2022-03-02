const Sequelize = require("sequelize");
const sequelize = require("../../dbconn/connection");

module.exports = sequelize.define("assigned_sections", {
  assignedId: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
  },
  sectionId: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
  },
  classId: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
  },
  schoolId: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM("1", "0"),
    allowNull: false,
    defaultValue: "1",
  },
});
