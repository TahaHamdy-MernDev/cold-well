const jwt = require("jsonwebtoken");
const dbService = require("../utils/dbService");
const User = require("../model/userModel");
const authenticate = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt; 
  }


  if (!token) {
    return res.unAuthorized({ message: "No token provided, access denied" });
  }
 console.log(token)
  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    console.log(decoded);
    const freshUser = await dbService.findOne(User, { _id: decoded._id, token: token });
    if (!freshUser) {
      return res.recordNotFound({
        message: "The user belonging to this token does no longer exist or token mismatch",
      });
    }
    req.user = freshUser;
    next();
  } catch (error) {
    console.log(error);
    return res.unAuthorized({ message: "Invalid token, access denied" });
  }
};

module.exports = {
  authenticate,
}