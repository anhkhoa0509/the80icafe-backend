"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */

        static associate(models) {
            // User.belongsTo(models.AllCode, {
            //     foreignKey: "positionID",
            //     targetKey: "keyMap",
            //     as: "positionData",
            // });
            // User.belongsTo(models.AllCode, {
            //     foreignKey: "gender",
            //     targetKey: "keyMap",
            //     as: "genderData",
            // });
            // User.hasOne(models.Markdown, {foreignKey: "doctorID"});
            // User.hasOne(models.Doctor_InFor, {foreignKey: 'doctorID'})
            //
            // User.hasMany(models.Cmnr,
            //     {foreignKey: 'patientID',as:'patientData'})

        }
    }

    User.init(
        {
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            fullname: DataTypes.STRING,
            address: DataTypes.STRING,
            roleID: DataTypes.STRING,
            numberPhone: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "User",
        }
    );
    return User;
};
