const router = require("express").Router();

router.use('/auth',require('./authRoutes'))
router.use('/property',require('./propertyRoutes'))
router.use('/developer',require('./developerRoutes'))
router.use('/type',require('./typeRoutes'))
router.use('/launch',require('./launchRoutes'))
module.exports = router;