import adminService from "./../services/adminService";

const addProduct = async (req, res) => {
    const product = req.body;
    let mess = await adminService.addProduct(req.body);
    if (mess) {
        return res.status(200).json(mess);
    }
    else{
        return res.status(500).json({mess: "id is null"});
    }
};

const getFullBookingProduct =async (req, res) => {
    
    let mess = await adminService.getFullBookingProduct()
    if (mess) {
        return res.status(200).json(mess);
    }
    else{
        return res.status(500).json({mess: "id is null"});
    }
}
const accessOrder =async (req, res) => {
    const id = req.body.id;
    let mess = await adminService.accessOrder(id)
    if (mess) {
        return res.status(200).json(mess);
    }
    else{
        return res.status(500).json({mess: "id is null"});
    }
}

module.exports = {
    addProduct,
    getFullBookingProduct,
    accessOrder
};
