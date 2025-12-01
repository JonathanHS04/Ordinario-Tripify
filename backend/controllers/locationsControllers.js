const asyncHandler = require('express-async-handler')
const Location = require('../models/locationsModel')

const getLocations = asyncHandler(async (req, res) => {
    const locations = await Location.findAll()
    res.status(200).json(locations)
})

module.exports = {
    getLocations,
}