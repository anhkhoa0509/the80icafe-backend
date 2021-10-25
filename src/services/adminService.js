import db from "../models/index";
import emailService from "./emailService";

const addProduct = (product) => {
  return new Promise(async (resolve, reject) => {
    try {
        if(!product.name||!product.descriptionHTML||!product.descriptionMarkdown||
            !product.img||!product.roleID||!product.price){
                resolve({
                    errCode: 1,
                    errMess: "1 trong 6 trường rỗng"
                })
            }
      else{
        await db.Product.create({
            name: product.name,
            descriptionHTML: product.descriptionHTML,
            descriptionMarkdown: product.descriptionMarkdown,
            img: product.img,
            roleID: product.roleID,
            price: product.price
        });
        resolve({
          errCode: 0,
          errMess: "Create 1 product suscces",
        });
      } 
    } catch (e) {
        reject(e);
    }
  });
};
const getFullBookingProduct = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let fullBooking =  await db.Cart.findAll({
        where: {roleID : 1}
     });
      if(fullBooking && fullBooking.length > 0) {
        resolve({
          errCode : 0,
          errMess: 'Get success',
          fullBooking
        })
      }
      else{
        resolve({
          errCode : 0,
         errMess: 'Không có đơn hàng nào cả!'
        })
      }
    } catch (e) {
        reject(e);
    }
  });
};

const accessOrder = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if(!id){
        resolve({
          errCode: 1,
          errMess: 'id is Null'
        })
      }
      else{
        let itemOrder = await db.Cart.findOne({ 
          where: {id : id},
          raw: false,
        })
        await emailService.sendAttachment(itemOrder)
        if(itemOrder){
          itemOrder.roleID = 2
          await itemOrder.save()
          resolve({
            errCode: 0,
            errMess: 'Xác nhận đơn hàng thành công!'
          })
        }
        else{
          resolve({
            errCode: 2,
            errMess: 'Không tìm thấy đơn hàng!'
          })
        }
      }
    }
    catch(e){ 
      reject(e)
    }
  });
}

module.exports = {
  addProduct,
  getFullBookingProduct,
  accessOrder
};
