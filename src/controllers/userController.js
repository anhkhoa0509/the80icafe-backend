import userService from "./../services/userService";

const apiLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            mess: "Email or Password is Null",
        });
    } else {
        let dataUser = await userService.checkLoginUser(email, password);
        return res.status(200).json({
            errCode: dataUser.errCode,
            errMess: dataUser.errMess,
            user: dataUser.user,
        });
    }
};

const getUser = async (req, res) => {
    let id = req.body.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            messErr: "id ==null",
        });
    }
    let users = await userService.findUser(id);
    if (users) {
        return res.status(200).json({
            errCode: users.errCode,
            errMess: users.errMess,
            user: users,
        });
    } else {
        return res.status(404).json({
            errCode: 2,
            messErr: "Dont finded user",
        });
    }
};



const createUser = async (req, res) => {
    const user = req.body.user;
    if (!user.email || !user.password) {
        return res.status(500).json({
            errCode: 1,
            mess: "email or password is null",
        });
    } else {
        const mess = await userService.createUser(user);
        return res.status(200).json(mess);
    }
};

const editUser = async (req, res) => {
    const user = req.body.data.user;
    let mess = await userService.editUser(user);
    if (mess) {
        return res.status(200).json(mess);
    }
    else{
        return res.status(500).json({mess: "id is null"});
    }
};
const deleteUser = async (req, res) => {
    const id = req.body.id;
    if (id) {
        let mess = await userService.deleteUser(id);
        return res.status(200).json({mess});
    } else {
        return res.status(500).json({mess: "id is null"});
    }
};

const getFullProduct = async (req, res) =>{
    try{
        let value = await userService.getFullProduct();
      return res.status(200).json(value)
    }
    catch{
        return res.status(500).json({mess: "Loi server"});
    }
}

const addListProduct = async (req, res) =>{
    const listProduct = req.body;
    if (listProduct) {
       let mess =  await  userService.addListProduct(listProduct);
       return res.status(200).json(mess)
    } else {
        return res.status(500).json({
            errCode: 1,
            mess: "List product is null",
        });
    }
}
const verifyToken = async  (req,res) =>{
    const data = req.body;
    if (data) {
        let mess =  await  userService.verifyBooking(data);
        return res.status(200).json(mess)
    } else {
        return res.status(500).json({
            errCode: 1,
            mess: "verifyToken is null",
        });
    }
}
const getHistoryOrderUser = async  (req,res) =>{
    const data = req.body.id;
    if (data) {
        let mess =  await  userService.getHistoryOrderUser(data);
        return res.status(200).json(mess)
    } else {
        return res.status(500).json({
            errCode: 1,
            mess: "id is null",
        });
    }
}
const getCurrentOrderUser = async  (req,res) =>{
    const data = req.body.id;
    console.log('data',req.body)
    if (data) {
        let mess =  await  userService.getCurrentOrderUser(data);
        return res.status(200).json(mess)
    } else {
        return res.status(500).json({
            errCode: 1,
            mess: "id is null",
        });
    }
}
module.exports = {
    apiLogin,
    getUser,
    createUser,
    editUser,
    deleteUser,
    getFullProduct,
    addListProduct,
    verifyToken,
    getHistoryOrderUser,
    getCurrentOrderUser
};
