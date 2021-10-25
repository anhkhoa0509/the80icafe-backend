import db from "../models/index";
import CRUDservice from "./../services/CRUDservice";

// Thêm dữ liệu sẽ chạy qua đây
let createUser = async (req, res) => {
  await CRUDservice.createNewUser(req.body);
  return res.send("post thanh cong");
};
// Lấy dữ liệu sẽ chạy cái này
let getUser = async (req, res) => {
  let data = await CRUDservice.renderTable();
  return res.render("test/getTable", {
    dataTable: data,
  });
};
// Edit dữ liệu người dùng
let editUser = async (req, res) => {
  let data = await CRUDservice.editUser(req.query.id)
  return res.render("test/edit",{
    user : data
  })
};
let putUser = async (req, res) =>{
  let user = req.body
  await CRUDservice.updateUser(user);
  return res.redirect("/getUser")
}

// Thử lần đầu in dữ liệu từ sql
let homePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render("index.ejs", {
      data: JSON.stringify(data),
    });
  } catch {
    console.log("loi");
  }
};
// Qua trang đăng ký
let trangphu = (req, res) => {
  return res.render("test/dangky.ejs");
};
module.exports = {
  homePage,
  trangphu,
  createUser,
  getUser,
  editUser,
  putUser
};
