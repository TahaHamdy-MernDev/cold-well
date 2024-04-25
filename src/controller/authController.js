const User = require("../model/userModel");
const asyncHandler = require("../utils/asyncHandler");
const passport = require("passport");
const dbService = require("../utils/dbService");
const { createSendToken } = require("../utils/createSendToken");
exports.register = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  let data = {
    email,
    password,
    firstName,
    lastName,
  };

 const user = await dbService.findOne(User, { email });
  if (user) {
    return res.conflict("email")
  }
await dbService.create(User, data);
   res.success({message: "User created successfully"});
});
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await dbService.findOne(User, { email });
  if (!user) {
    return res.recordNotFound('User')
  }
  const isPasswordMatched = await user.isPasswordMatch(password);
  if (!isPasswordMatched) { 
    return  res.badRequest({message: "Incorrect Password" });
  }
  createSendToken(user, res);
});

// get the current user
exports.getCurrentUser = asyncHandler(async (req, res) => {
  const user = await dbService.findOne(User, { _id: req.user._id });
  if (!user) {
    return res.recordNotFound("User");
  }
  res.success({ data: user });
}); 
