import db from "../models/index"
import emailService from "./emailService";
import {v4 as uuidv4} from 'uuid';

require('dotenv').config()

db.Booking = undefined;
let postBookDoctor = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorID || !data.timeType || !data.date) {
                resolve({
                    errCode: 1,
                    errMess: 'Missing params'
                })
            } else {
                let user = await db.User.findOrCreate({
                    where: {email: data.email},
                    defaults: {
                        email: data.email,
                        roleID: 'R3',
                        address: data.address,
                        firstName: data.allname
                    },
                })
                //Email
                let token = uuidv4()
                let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorID=${data.doctorID}`
                await emailService.sendEmail({
                    reciverEmail: data.email,
                    patientName: data.allname,
                    time: data.timeType,
                    date: data.date,
                    name: data.name,
                    redirectLink: result
                })
                if (user && user[0]) {
                    await db.Cmnr.findOrCreate({
                        where: {patientID: user[0].id},
                        defaults: {
                            statusID: 'S1',
                            doctorID: data.doctorID,
                            patientID: user[0].id,
                            date: data.date,
                            timeType: data.timeType,
                            token: token
                        }
                    })
                }
                resolve({
                    errCode: 0,
                    errMess: 'Ok'
                })

            }
        } catch (e) {
            reject(e)
        }
    })
}
const verifyToken = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('data',data)
            if (!data.token || !data.doctorID) {
                resolve({
                    errCode: -1,
                    errMess: 'Có 1 trường dữ liệu rỗng!'
                })
            } else {
                let user = await db.Cmnr.findOne({
                        where: {
                            doctorID: data.doctorID,
                            token: data.token,
                            statusID: 'S1'
                        },
                        raw: false
                    },
                )
                if (user) {
                    user.statusID = 'S2'
                    await user.save()
                    resolve({
                        errCode: 0,
                        errMess: 'OK'
                    })
                } else {
                resolve({
                    errCode: 2,
                    errMess: 'Không tìm thấy Booking'
                })
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    postBookDoctor,
    verifyToken
}