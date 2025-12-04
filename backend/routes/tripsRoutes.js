const express = require('express')
const router = express.Router()
const { createTrip, completeTrip, cancelTrip, getTripsByUser } = require('../controllers/tripsControllers')
const { protect } = require('../middleware/authMiddleware')

router.post('/', protect, createTrip)
router.get('/', protect, getTripsByUser)
router.put('/complete/:id', protect, completeTrip)
router.put('/cancel/:id', protect, cancelTrip)

module.exports = router
