const authCtrl = require("../controller/authController");
const { authenticate } = require("../middlewares/authentication");
const { validateRequestParameters } = require("../utils/validate");
const { loginKeys } = require("../utils/validation/authValidation");

const router = require("express").Router();

router.post("/login",validateRequestParameters(loginKeys), authCtrl.login);

router.post("/register", authCtrl.register);

router.get("/current-user",authenticate, authCtrl.getCurrentUser);
module.exports = router;
 