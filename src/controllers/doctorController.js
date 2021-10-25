import doctorService from "./../services/doctorService";

let getTopDoctor = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        let respond = await doctorService.getTopDoctor(+limit);
        return res.status(200).json(respond);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            messErr: "Erro From Server",
        });
    }
};
let postInforDoctor = async (req, res) => {
    try {
        let response = await doctorService.postInforDoctor(req.body.inforDoctor)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMess: "Server Cup dien"
        })
    }
};
const getInforDoctorByID = async (req, res) => {
    try {
        let infor = await doctorService.getInforDoctorByID(req.query.id)
        return res.status(200).json(infor)
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMess: 'Server sap nguon'
        })
    }
}

const bulkCreateSchedule = async (req, res) => {
    try {
        let infor = await doctorService.bulkCreateSchedule(req.body)
        return res.status(200).json(infor)
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMess: 'Err Sever'
        })
    }
}
const getScheduleByDate = async (req, res) => {
    try {
        let infor = await doctorService.getScheduleByDate(req.query.id, req.query.date)
        return res.status(200).json(infor)
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMess: 'Err From Server'
        })
    }
}
const getListPatientforDoctor = async (req, res) => {
    try {
        let infor = await doctorService.getListPatientforDoctor(req.query.doctorID,req.query.date)
        return res.status(200).json(infor)
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMess: 'Err From Server'
        })
    }
}
const sendRemedy = async (req,res) =>{
    try{
        let data = doctorService.sendRemedy(req.body)
        return res.status(200).json({
            errCode: 0,
            errMess: 'OK'
        })
    }
    catch (e){
        return res.status(200).json({
            errCode: -1,
            errMess: 'Err From Server'
        })
    }

}
module.exports = {
    getTopDoctor,
    postInforDoctor,
    getInforDoctorByID,
    bulkCreateSchedule,
    getScheduleByDate,
    getListPatientforDoctor,
    sendRemedy
};
