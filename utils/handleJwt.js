const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const getProperties = require("./handlePropertiesEngine")
const propertiesKey = getProperties()

const tokenSign = async (userObj) => {
  const sign = jwt.sign(
    {
      [propertiesKey.id]: userObj[propertiesKey.id],
      role: userObj.role,
    },
    JWT_SECRET,
    { expiresIn: "3h" }
  );

  return sign
};

const verifyToken = async (tokenJwt) => {
  try {
    return jwt.verify(tokenJwt,JWT_SECRET)
  } catch (err) {
    return null
  }
};

module.exports = { tokenSign, verifyToken}
