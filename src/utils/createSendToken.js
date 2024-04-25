const jwt = require("jsonwebtoken");

const generateToken = (payload, secret, expiresIn) => {
  return jwt.sign(payload, secret, { expiresIn });
};

const generateAuthToken = async (user) => {
  const secret = process.env.JWT_TOKEN_SECRET
  const payload = { _id: user._id ,role:user.role };
  const expiresIn = process.env.JWT_TOKEN_EXPIRES_IN;

  let token = generateToken(payload, secret, expiresIn);
  user.token = token;
  await user.save();
  return { token };
};

const createSendToken = async (user, res) => {
  const { token } = await generateAuthToken(user);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  res.success({message:"your successfully logged in" });
};
module.exports = {
  createSendToken,
  generateAuthToken,
};
