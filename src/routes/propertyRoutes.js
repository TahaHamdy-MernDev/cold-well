const propertyCtrl = require("../controller/propertyController");
const { authenticate } = require("../middlewares/authentication");
const idValidator = require("../utils/idValidator");
const { upload } = require("../utils/upload");
const { validateRequestParameters } = require("../utils/validate");
const { propertyKeys } = require("../utils/validation/propertyValidation");

const router = require("express").Router();

router.get("/get-one/:id", idValidator, propertyCtrl.getProperty);
router.get("/get-all", propertyCtrl.getAllProperties);
router.post(
  "/create",
  upload.fields([
    { name: "thumbnail", maxCount: 6 },
    { name: "image", maxCount: 6 },
  ]),
  (req,res,next)=>{
    console.log("ffffffffffffffffffffffffffffffffffffffffffffff:",req.files);
    next();
    },
  // authenticate,
  validateRequestParameters(propertyKeys),
  propertyCtrl.createProperty
);

router.put(
  "/update/:id",
  idValidator,
  upload.fields([{ name: "image", maxCount: 6 }]),
  validateRequestParameters(propertyKeys),
  propertyCtrl.updateProperty
);

// router.put("/upload/:id", upload.array('images', 6), propertyCtrl.uploadImages)
router.delete("/delete/:id", idValidator, propertyCtrl.deleteProperty);
router.get("/get-properties-for-sale", propertyCtrl.getPropertiesForSale);
router.get("/get-properties-for-rent", propertyCtrl.getPropertiesForRent);

module.exports = router;
