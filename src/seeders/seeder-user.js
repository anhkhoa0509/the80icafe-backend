"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        email: "ahxtb@gmail.com",
        password: "ahxtb123",
        firstName: "Anh hang xom",
        lastName: "Tot bung",
        address: "gam cau",
        gender: 1,
        roleID: "R1",
        numberPhone: "0699696966969",
        positionID: "doctor",
        img: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
