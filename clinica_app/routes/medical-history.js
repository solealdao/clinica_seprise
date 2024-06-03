const express = require('express');
const router = express.Router();

router.get('/medical-record', function(req, res) {
    res.render('medical-record');
});

module.exports = router;




