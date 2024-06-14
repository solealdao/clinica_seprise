var express = require('express');
var router = express.Router();
var suppliesController = require('../controllers/suppliesController');

router.get('/supplies-management', suppliesController.renderSupplies);

router.get('/supplies-update', suppliesController.renderUpdateSupplies);
router.post('/supplies-update', suppliesController.updateSupplies);

router.get('/supplies-search', suppliesController.renderStockStatus);

module.exports = router;
