// import all required dependencies
const { data: MODULE_DATA } = require("../root/data");
let { Sequelize} = require("sequelize");

let sequelize = new Sequelize(
  MODULE_DATA["db-name"], // database name exported from root/data.js
  MODULE_DATA["host-user"], // username
  MODULE_DATA["host-pass"], // password
  {
    host: MODULE_DATA["host-name"], // host-source
    dialect: MODULE_DATA["db-dialect"], // database type
    logging: false,
  }
);

async function ConfigDatabase(){
  try {
    await sequelize.authenticate();
    console.log("database connected!");
  }
  catch(error){
    throw error.message;
  }
}
module.exports = {
  sequelize,
  ConfigDatabase  
};
