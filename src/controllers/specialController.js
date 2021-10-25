import specialService from "./../services/specialService"

let createSpecial = async (req, res) => {
    try {
        // console.log('co qua day va du lieu la-----------',req.body)
        let data = await specialService.createSpecial(req.body)
        return res.status(200).json(data)
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMess: 'SERVER sap nguon'
        })
    }
};


module.exports = {
    createSpecial
};
