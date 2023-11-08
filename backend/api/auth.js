const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server");
const { User } = require("../db/index");

const SECRET_KEY = process.env.SECRET_KEY;

const authenticated = (next) => async (parent, args, context, info) => {
  if (!context.user) {
    throw new AuthenticationError("Not authorized");
  }
  return await next(parent, args, context, info);
};

const authorized = (role, next) => async (parent, args, context, info) => {
  if (context.user.role !== role) {
    throw new AuthenticationError(`You must have the ${role} role`);
  }
  return await next(parent, args, context, info);
};

const verifyAndGetUser = async (token) => {
  try {
    if (!token) {
      throw new AuthenticationError("You are not logged in. Please log in to get access.");
    }

    const decodedToken = jwt.verify(token, SECRET_KEY);

    // Check if the user exists
    const user = await User.findById(decodedToken.id);
    if (!user) {
      throw new AuthenticationError("There is no user with this ID.");
    }

    // Check if the user has changed the password after the token was created
    if (user.changePasswordAt > decodedToken.iat) {
      throw new AuthenticationError("User recently changed the password. Please log in again.");
    }

    return user;
  } catch (e) {
    return null;
  }
};

module.exports = {
  authenticated,
  authorized,
  verifyAndGetUser,
};
