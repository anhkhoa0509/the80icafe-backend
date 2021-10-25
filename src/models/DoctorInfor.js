"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Doctor_InFor extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Doctor_InFor.belongsTo(models.User,{foreignKey:'doctorID'})
            //
            // Doctor_InFor.belongsTo(models.AllCode, {foreignKey: 'priceID',targetKey:'keyMap', as: 'priceData'})
            // Doctor_InFor.belongsTo(models.AllCode, {foreignKey: 'provinceID',targetKey:'keyMap', as: 'provinceData'})
            // Doctor_InFor.belongsTo(models.AllCode, {foreignKey: 'paymentID',targetKey:'keyMap', as: 'paymentData'})

        }
    }
    Doctor_InFor.init(
        {
            doctorID: DataTypes.INTEGER,
            priceID: DataTypes.STRING,
            provinceID: DataTypes.STRING,
            paymentID: DataTypes.STRING,
            addressClinic: DataTypes.STRING,
            nameClinic: DataTypes.STRING,
            note: DataTypes.STRING,
            count: DataTypes.INTEGER
        },
        {
            sequelize,
            modelName: "Doctor_InFor",
            freezeTableName: true
        }
    );
    return Doctor_InFor;
};
