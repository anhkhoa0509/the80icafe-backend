import nodemailer from "nodemailer";
import moment from "moment";

require('dotenv').config()



let sendEmail = async (data) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL, // generated ethereal user
            pass: process.env.PASS_EMAIL, // generated ethereal password
        },
    });
    await transporter.sendMail({
        from: '"Nguyễn Lê Anh Khoa" <anhkhoa999go@gmail.com>', // sender address
        to: data.reciverEmail, // list of receivers
        subject: 'Xác nhận đơn hàng!', // Subject line
        html: `

        <body>
        <h3>Xin chào ${data.patientName}!</h3>
        <p><b>Bạn đã tiến hành đặt hàng với các món sau:</b></p>
        
        <table width="100%">
        <tr>
        <th>Tên</th>
        <th>Số lượng</th>
        <th>Giá</th>
      </tr>
        ${data.listProduct && data.listProduct.map((item =>{
            return  `<tr>
            <th>${item.name}</th>
            <th>${item.currentValue}</th>
            <th>${item.price}</th>
          </tr>`
        }) )}
              <th>Tổng:</th>
             <th colspan = "2" text-align = "center"> ${data.price} VND</th>
            </table>
        <b>Nhấn vào link hoàn tất : <a href = ${data.redirectLink}>Click here</a></b>
        `, // html body
    });
}


let sendAttachment = async (data) => {
    return new Promise(async (resolve, reject) => {
            try {
                let transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 587,
                    secure: false, // true for 465, false for other ports
                    auth: {
                        user: process.env.EMAIL, // generated ethereal user
                        pass: process.env.PASS_EMAIL, // generated ethereal password
                    },
                });
                await transporter.sendMail({
                    from: '"Nguyễn Lê Anh Khoa" <anhkhoa999go@gmail.com>', // sender address
                    to: data.email, // list of receivers
                    subject: 'Đơn hàng đã được hoàn thành!', // Subject line
                    html: `
                           <h3>Xin chào ${data.name}</h3>
                           <p>Đơn hàng của bạn đã đc hoàn thành. Chúng tôi đang trên đường giao nó đến bạn, chờ chút nhé!</p>
                           <div>Xin chân thành cảm ơn!</div>`,
                    // attachments: [
                    //     {
                    //         filename: `Thong-tin-hoa-dom-${data.paratientID}.jpg`,
                    //         content: data.imgBase64.split("base64,")[1],
                    //         encoding: 'base64'
                    //     }
                    // ]
                })
                resolve(true)
            } catch (e) {
                reject(e)
            }
        }
    )

}


module.exports = {
    sendEmail,
    sendAttachment
}