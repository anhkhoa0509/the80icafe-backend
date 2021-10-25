"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Cmnrs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      statusID: {
        type: Sequelize.STRING,
      },
      doctorID: {
        type: Sequelize.INTEGER,
      },
      patientID: {
        type: Sequelize.INTEGER,
      },
      token: {
        type: Sequelize.STRING,
      },
      date: {
        type: Sequelize.STRING,
      },
      timeType: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Cmnrs");
  },
};
