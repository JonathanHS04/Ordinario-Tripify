const express = require('express')
const router = express.Router()
const { completeTrip, cancelTrip, getTripsByUser } = require('../controllers/tripsControllers')
const { protect } = require('../middleware/authMiddleware')

router.get('/', protect, getTripsByUser)
router.put('/complete/:id', protect, completeTrip)
router.put('/cancel/:id', protect, cancelTrip)

module.exports = router
