const devCtrl = require("../controller/developerController");
const idValidator = require("../utils/idValidator");
const { upload } = require("../utils/upload");
const { validateRequestParameters } = require("../utils/validate");
const { createDevKeys } = require("../utils/validation/developerValidation");

const router = require("express").Router();

router.get("/get-one/:id", idValidator, devCtrl.getDeveloper);
router.get("/get-all", devCtrl.getAllDevelopers);
router.post(
  "/create",
  upload.fields([{ name: "image", maxCount: 1 }]),
  validateRequestParameters(createDevKeys),
  devCtrl.createDeveloper
);
router.put(
  "/update/:id",
  idValidator,
  upload.fields([{ name: "image", maxCount: 1 }]),
  validateRequestParameters(createDevKeys),
  devCtrl.updateDeveloper
);


router.delete("/delete/:id", idValidator, devCtrl.deleteDeveloper);
module.exports = router;
