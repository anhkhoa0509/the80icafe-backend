import patientService from "./../services/patientService"

let bookDoctor = async (req, res) => {
    try {
        let data = await patientService.postBookDoctor(req.body)
        return res.status(200).json(data)
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMess: 'SERVER sap nguon'
        })
    }
};
let verifyToken = async (req,res) =>{
    try{
        console.log('co qua day---------------------------')
        let data = await patientService.verifyToken(req.body)
        return res.status(200).json(data)
    }
    catch (e){
         return res.status(200).json({
            errCode: -1,
            errMess: 'SERVER sap nguon'
        })
    }
}

module.exports = {
    bookDoctor,
    verifyToken
};
