
const { handleHttpError } = require("../utils/handleError");

const checkRol = (roles) => (req, res, next) => {
  try {
    const {user} = req
    const userRoles = user.role

    const checkValueRol = roles.some(rolSingle => userRoles.includes(rolSingle))

    if (!checkValueRol) {
        handleHttpError(res, "USER_NOT_PERMISSIONS", 403);
        return
    }
    
    next();
  } catch (err) {
    handleHttpError(res, "ERROR_PERMISSIONS", 403);
  }
};

module.exports = checkRol;