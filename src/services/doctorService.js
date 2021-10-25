import {differenceWith} from "lodash";
import db from "../models/index";
import emailService from "./emailService";
require("dotenv").config();

let getTopDoctor = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit: limitInput,
                where: {roleID: "R2"},
                attributes: {
                    exclude: ["password"],
                },
                include: [
                    {
                        model: db.AllCode,
                        as: "positionData",
                    },
                    {
                        model: db.AllCode,
                        as: "genderData",
                    },
                ],
                raw: true,
                nest: true,
            });
            resolve({
                errCode: 0,
                data: users,
            });
        } catch (e) {
            reject(e);
        }
    });
};
let postInforDoctor = (inforDoctor) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (
                !inforDoctor.contentHTML ||
                !inforDoctor.selectedOption.value ||
                !inforDoctor.description ||
                !inforDoctor.contentMarkdown ||
                !inforDoctor.valueCurrentPrice ||
                !inforDoctor.valueCurrentPayment
                || !inforDoctor.valueCurrentProvince ||
                !inforDoctor.nameClinic || !inforDoctor.addressClinic
                || !inforDoctor.noteClinic
            ) {
                resolve({
                    errCode: -1,
                    errMess: "1 Trong 10 truong giong nhu cai tui cua toi (trong)",
                });
            } else {

                if (inforDoctor.isEdit) {
                    let value = await db.Markdown.findOne({
                        where: {doctorID: inforDoctor.doctorID},
                        raw: false,
                    });
                    if (value) {
                        value.description = inforDoctor.description,
                            value.contentMarkdown = inforDoctor.contentMarkdown,
                            value.contentHTML = inforDoctor.contentHTML,
                            await value.save();
                        resolve({errCode: 0, errMess: "Edit thanh cong",});
                    }
                } else {
                    await db.Markdown.create({
                        contentHTML: inforDoctor.contentHTML,
                        selectedOption: inforDoctor.selectedOption,
                        description: inforDoctor.description,
                        contentMarkdown: inforDoctor.contentMarkdown,
                        doctorID: inforDoctor.doctorID,
                    });
                }
                let infor_doctor = await db.Doctor_InFor.findOne({
                    where: {doctorID: inforDoctor.doctorID},
                    raw: false
                })
                if (infor_doctor) {
                        infor_doctor.doctorID = inforDoctor.doctorID,
                        infor_doctor.priceID = inforDoctor.valueCurrentPrice,
                        infor_doctor.provinceID = inforDoctor.valueCurrentProvince,
                        infor_doctor.paymentID = inforDoctor.valueCurrentPayment,
                        infor_doctor.addressClinic = inforDoctor.addressClinic,
                        infor_doctor.nameClinic = inforDoctor.nameClinic,
                        infor_doctor.note = inforDoctor.noteClinic,
                        infor_doctor.count = 0
                    await  infor_doctor.save()
                } else {
                    await db.Doctor_InFor.create({
                        doctorID: inforDoctor.doctorID,
                        priceID: inforDoctor.valueCurrentPrice,
                        provinceID: inforDoctor.valueCurrentProvince,
                        paymentID: inforDoctor.valueCurrentPayment,
                        addressClinic: inforDoctor.addressClinic,
                        nameClinic: inforDoctor.nameClinic,
                        note: inforDoctor.noteClinic,
                        count: 0
                    });
                }
                resolve({
                    errCode: 0,
                    errMess: "Save thanh cong",
                });
            }
        } catch (e) {
            reject(e)
        }

    });

};

const getInforDoctorByID = (idInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!idInput) {
                resolve({
                    errCode: 1,
                    errMess: "Id is null",
                });
            } else {
                let data = await db.User.findOne({
                    where: {id: +idInput},
                    attributes: {
                        exclude: ["password"],
                    },
                    include: [
                        {
                            model: db.Markdown,
                            attributes: ["description", "contentHTML", "contentMarkdown"],
                        },
                        {
                            model: db.AllCode,
                            as: "positionData",
                        },
                        {
                            model: db.Doctor_InFor,
                            // attributes: {
                            //     exclude: ['id','doctorID']
                            // },
                            include:[
                                {
                                    model: db.AllCode, as: 'priceData', attributes: ['valueVI','valueEN']
                                },
                                {
                                    model: db.AllCode, as: 'provinceData', attributes: ['valueVI']
                                },
                                {
                                    model: db.AllCode, as: 'paymentData', attributes: ['valueVI']
                                }
                            ]
                        },
                    ],
                    raw: false,
                    nest: true,
                });
                if (data.img) {
                    data.img = new Buffer(data.img, "base64").toString("binary");
                }
                resolve({
                    errCode: 0,
                    data: data,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

const bulkCreateSchedule = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let schedule = []
            if (!data.arrSchedule || !data.doctorID || !data.formatDate) {
                resolve({
                    errCode: -1,
                    errMess: "Missing required param!",
                });
            } else {
                schedule = data.arrSchedule;
                if (schedule && schedule.length > 0) {
                    schedule.map((item) => {
                        item.maxNumber = MAX_NUMBER_SCHEDULE;
                        return item;
                    });
                }
            }
            let existing = await db.Schedule.findAll(
                {
                    where: {doctorID: data.doctorID, date: +data.formatDate},
                    attributes: ['timeType', 'date', 'doctorID', 'maxNumber'],
                    raw: true
                }
            );
            // Check phan tu them vao co bi trung hay khong
            let toCreate = differenceWith(schedule, existing, (a, b) => {
                return a.timeType === b.timeType && a.date === +b.date
            })

            if (toCreate && toCreate.length > 0) {
                await db.Schedule.bulkCreate(toCreate)
                resolve({
                    errCode: 0,
                    errMess: 'Oke bro'
                })
            } else {
                resolve({
                    errCode: -1,
                    errMess: 'Trung'
                })
            }
        } catch (e) {
            reject(e)
        }
    });
};

const getScheduleByDate = (id, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id || !date) {
                resolve({
                    errCode: -1,
                    errMess: 'Params is Null'
                })
            } else {
                let value = await db.Schedule.findAll({
                    where: {doctorID: id, date: date},
                    include: [{
                        model: db.AllCode, as: 'timeTypeData'
                    },{
                        model: db.User, as : 'doctorData', attributes: ['firstName','lastName']
                    }],
                    nest: false,
                    raw: true
                })
                if (!value)
                    value = []
                resolve({
                    errCode: 0,
                    data: value
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
// getListPatientforDoctor

const getListPatientforDoctor = (id, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id || !date) {
                resolve({
                    errCode: -1,
                    errMess: 'Params is Null'
                })
            } else {
                let allUser =  await db.Cmnr.findAll({
                    where:{
                        doctorID: id,
                        date: date,
                        statusID: 'S2'
                    } ,
                    include: [{
                        model: db.User, as: 'patientData',
                        attributes:['email','firstName','address','gender'],
                        include: [
                            {
                                model: db.AllCode, as: 'genderData'
                            }
                        ]
                    }],
                    raw: false,
                    nest: true

                })

                resolve({
                    errCode: 0,
                    data: allUser
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}



module.exports = {
    getTopDoctor,
    postInforDoctor,
    getInforDoctorByID,
    bulkCreateSchedule,
    getScheduleByDate,
    getListPatientforDoctor,
};
