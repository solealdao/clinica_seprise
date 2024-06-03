var express = require('express');
var router = express.Router();
var suppliesController = require('../controllers/suppliesController');

/* GET stock update home page. */
router.get('/stock-update', function (req, res, next) {
    res.render('stock-update');
});

router.post('/stock-update/update-supplies', (req, res) => {
    const selectedOption = req.body.clinical_study;

    suppliesController.updateSupplies(selectedOption);

    res.send('Suministros actualizados correctamente.');
});

module.exports = router;
