const Sequelize = require("sequelize");
const APPCONSTANTS = require("../../app.constants");

var host = "localhost";
var username = "root";
var database = "sonet_school";
var password = "";
var dialect = APPCONSTANTS.DIALECT;
var port = process.env.DBPORT;
if (APPCONSTANTS.DBHOST != "localhost") {
  password = APPCONSTANTS.DBPASSWORD;
  host = APPCONSTANTS.DBHOST;
  username = APPCONSTANTS.DBUSER;
  database = APPCONSTANTS.DATABASE;
}

const config = {
  username,
  database,
  host,
  dialect,
  password,
  port,
};
console.log("cofig", config);

const sequelize = new Sequelize(config);
module.exports = sequelize;
global.sequelize = sequelize;
