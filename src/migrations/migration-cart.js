"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Carts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        // userID: DataTypes.INTEGER,
        // listProduct: DataTypes.TEXT,
        // mess: DataTypes.TEXT,
        // price:  DataTypes.INTEGER,
      },
      userID: {
        type: Sequelize.INTEGER,
      },
      listProduct: {
        type: Sequelize.TEXT,
      },
      address: {
        type: Sequelize.TEXT,
      },
      name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      token: {
        type: Sequelize.TEXT,
      },
      numberPhone: {
        type: Sequelize.INTEGER,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      roleID : {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("Carts");
  },
};
