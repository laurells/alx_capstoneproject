const jwt = require("jsonwebtoken");

const signJWTToken = (userId) => {
  const secretKey = process.env.SECRET_KEY;
  const expiresIn = process.env.EXPIRE_IN;

  const token = jwt.sign({ id: userId }, secretKey, {
    expiresIn,
  });

  return token;
};

module.exports = {
  signJWTToken,
};
