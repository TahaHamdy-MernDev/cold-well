const typeCtrl = require("../controller/typeController");
const idValidator = require("../utils/idValidator");
const { upload } = require("../utils/upload");
const { validateRequestParameters } = require("../utils/validate");
const { typeKeys } = require("../utils/validation/typeValidation");

const router = require("express").Router();
router.post(
  "/create",
  validateRequestParameters(typeKeys),
  upload.fields([{ name: "image", maxCount: 1 }]),
  typeCtrl.createType
);
router.put(
  "/update/:id",
  idValidator,
  validateRequestParameters(typeKeys),
  upload.fields([{ name: "image", maxCount: 1 }]),
  typeCtrl.updateType
);
router.get("/get-one/:id", idValidator, typeCtrl.getType);
router.get("/get-all", typeCtrl.getAllTypes);
router.delete("/delete/:id", idValidator, typeCtrl.deleteType);
module.exports = router;
