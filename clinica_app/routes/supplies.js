var express = require('express');
var router = express.Router();
var suppliesController = require('../controllers/suppliesController');


router.get('/supplies-management', suppliesController.renderSupplies);

router.get('/stock-update', suppliesController.renderUpdateSupplies);
router.post('/stock-update', suppliesController.updateSupplies);

router.get('/stock-status', suppliesController.renderStockStatus);

module.exports = router;
