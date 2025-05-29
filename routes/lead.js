const express = require("express");
const router = express.Router();

const leadController = require("../controller/lead")


router.route('/create').post(leadController.createLead);
router.route('/test').get(leadController.testApi);

module.exports = router;