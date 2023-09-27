const { matchedData } = require("express-validator");
const { encrypt, compare } = require("../utils/handlePassword");
const { tokenSign } = require("../utils/handleJwt");
const { usersModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");


const registerUser = async (req, res) => {
  try {
    req = matchedData(req);
    const password = await encrypt(req.password);
    const body = { ...req, password };
  
    const dataUser = await usersModel.create(body);
    dataUser.set("password", undefined, { strict: false }); // Filtra la password para no mostrarla en la petición
  
    const data = {
      token: await tokenSign(dataUser),
      user: dataUser,
    };
  
    res.send({ data });
  } catch (err) {
    handleHttpError(res, "ERROR_REGISTER_USER")
  }
  
};

const loginUser = async (req, res) => {
  try {
    req = matchedData(req);
    const user = await usersModel.findOne({email: req.email}).select("password name email age")

    if (!user) {
      handleHttpError(res, "USER_DOES_NOT_EXIST", 404)
      return
    }

    const hashPassword = user.get("password");
    const check = await compare(req.password, hashPassword)
  
    if (!check) {
      handleHttpError(res, "PASSWORD_INCORRECT", 401)
      return
    }

    user.set("password", undefined, { strict: false })

    const data = {
      token: await tokenSign(user),
      user
    }
  
    res.send({ data });
  } catch (err) {
    handleHttpError(res, "ERROR_LOGIN_USER")
  }
  
};


module.exports = { registerUser, loginUser }
