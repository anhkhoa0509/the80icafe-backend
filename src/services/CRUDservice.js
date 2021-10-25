import bcrypt from "bcryptjs";
import db from "../models/index";

var salt = bcrypt.genSaltSync(10);

let createNewUser = async (user) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hasPasword = await hasPasswordUser(user.password);
      await db.User.create({
        email: user.email,
        password: hasPasword,
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        gender: user.gender,
        roleID: user.roleID,
        numberPhone: user.numberPhone,
      });
      resolve("create 1 user suscces");
    } catch (e) {
      reject(e);
    }
  });
};

let hasPasswordUser = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      var hashPasword = await bcrypt.hashSync(password, salt);
      resolve(hashPasword);
    } catch (e) {
      reject(e);
    }
  });
};

// Render danh sachs
let renderTable = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.User.findAll({
        raw: true,
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};
let editUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
        raw: true,
      });
      if (user) {
        resolve(user);
      } else {
        resolve([]);
      }
    } catch (e) {
      reject("bi loi roi a oi");
    }
  });
};

let updateUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: Number(data.id), 
        },
        raw: true,
      });
      if (user) {
        user.email = data.email,
        user.password = data.password,
        user.firstName = data.firstName,
        user.lastName = data.lastName,
        user.address = data.address,
        user.gender = data.gender,
        user.roleID = data.roleID,
        user.numberPhone = data.numberPhone,
        user.img = data.avatar;
        await user.save();
      }
      resolve();
    } catch (e) {
      reject("loi roi a oi",e,'la loi');
    }
  });
};
module.exports = {
  createNewUser,
  renderTable,
  editUser,
  updateUser,
};
