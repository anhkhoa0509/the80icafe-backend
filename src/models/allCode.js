"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class AllCode extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */

        static associate(models) {
            // AllCode.hasMany(models.User, {foreignKey: 'positionID', as: 'positionData'})
            // AllCode.hasMany(models.User, {foreignKey: 'gender', as: 'genderData'})
            // AllCode.hasMany(models.Schedule, {foreignKey: 'timeType', as: 'timeTypeData'})
            //
            // AllCode.hasMany(models.Doctor_InFor, {foreignKey: 'priceID', as: 'priceData'})
            // AllCode.hasMany(models.Doctor_InFor, {foreignKey: 'provinceID', as: 'provinceData'})
            // AllCode.hasMany(models.Doctor_InFor, {foreignKey: 'paymentID', as: 'paymentData'})

        }
    }

    AllCode.init(
        {
            keyMap: DataTypes.STRING,
            type: DataTypes.STRING,
            valueEN: DataTypes.STRING,
            valueVI: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "AllCode",
        }
    );
    return AllCode;
};
