const {Sequelize} = require("sequelize");

// Option 1: Passing a connection URI
// const sequelize = new Sequelize('sqlite::memory:') // Example for sqlite
// const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname') // Example for postgres

// // Option 2: Passing parameters separately (sqlite)
// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: 'path/to/database.sqlite'
// });

const sequelize = new Sequelize(
    "the80icafe", "root",
    null, {
        host: "localhost",
        dialect: "mysql",
        logging: false,

    });
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection database successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

module.exports = connectDB;
