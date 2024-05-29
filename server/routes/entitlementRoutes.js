const express = require('express');
const entitlementController = require('../controllers/entitlementController');
const router = express.Router();

router.get('/:userId', entitlementController.getEntitlements);
router.put('/:userId', entitlementController.updateEntitlements);

module.exports = router;
