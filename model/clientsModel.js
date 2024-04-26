// import all required dependencies
const { data: MODULE_DATA } = require("../root/data");
const {sequelize} = require("../connection/conn");
const { Model, DataTypes } = require("sequelize");

class ClientsModel extends Model {}

// define attributes
ClientsModel.init(
  {
    id: {
      type: DataTypes.STRING(255),
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM("male", "female", "other"),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: "clientImage/noimage.png",
      allowNull: true,
    },
    telephone: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "",
    },
    password: {
      type: DataTypes.STRING(500),
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: true,
    tableName: MODULE_DATA["clients-model"],
  }
);

ClientsModel.sync({});

module.exports = ClientsModel;