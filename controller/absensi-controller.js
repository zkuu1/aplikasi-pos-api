const absensiService = require('../services/absensi-service')
const absensiModels = require('../models/absensi')

// Send Data Absensi
const absensi = async(req, res, next) => {
    try {
    const result = await absensiService.userAbsensi(req.body);
    res.status(200).json({
        message: 'Successfully absensi',
        data: result})

    } catch (error) {
        next(error)
    }
}

// Get Data Absensi
const getAllAbsensi = async(req, res) => {
    try {
        const result = await absensiModels.getAllAbsensi();
        res.status(200).json({
        message: 'Successfully retrieved absensi',
        data: result
        });
    } catch (error) {
        console.error('Error retrieving absensi:', error);
        res.status(500).json({
        message: 'Server error while retrieving users',
        error: error.message
    });
    }
}


module.exports = {
    absensi,
    getAllAbsensi
}