const express = require('express')
const router = express.Router()
const { getLocations } = require('../controllers/locationsControllers')
const { protect } = require('../middleware/authMiddleware')

router.get('/', protect, getLocations)

module.exports = router
