const express = require('express');
const router = express.Router();
const absensiController = require('../controller/absensi-controller')


// Get Absensi
router.get('/', absensiController.getAllAbsensi);

// Post Absensi
router.post('/', absensiController.absensi);


module.exports = router;
