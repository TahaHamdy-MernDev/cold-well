const launchesCtrl = require("../controller/launchController");
const idValidator = require("../utils/idValidator");
const { upload } = require("../utils/upload");
const { validateRequestParameters } = require("../utils/validate");
const { launchKeys } = require("../utils/validation/launchValidation");

const router = require("express").Router();

router.get("/get-all", launchesCtrl.getAllLaunches);
router.get("/get-one/:id", idValidator, launchesCtrl.getLaunch);
router.get("/get-latest", launchesCtrl.getLatestLaunches);
router.get(
  "/get-developer/:id",
  idValidator,
  launchesCtrl.getDeveloperLaunches
);
router.post(
  "/create",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount:1 },
  ]),
  validateRequestParameters(launchKeys),
  launchesCtrl.createLaunch
);
router.put("/update/:id", idValidator, launchesCtrl.updateLaunch);
router.delete("/delete/:id", idValidator, launchesCtrl.deleteLaunch);

module.exports = router;
