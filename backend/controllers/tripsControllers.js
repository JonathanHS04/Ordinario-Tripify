
//Trip Controllers

const asyncHandler = require('express-async-handler')
const Trip = require('../models/tripsModel')

const completeTrip = asyncHandler( async(req, res) => {
    const { id } = req.params

    const trip = await Trip.findByPk(id)

    if (!trip) {
        res.status(404)
        throw new Error('Trip not found')
    }

    if (trip.userId !== req.user.id) {
        res.status(403)
        throw new Error('Not authorized')
    }

    trip.status = 'completed'
    await trip.save()

    res.status(200).json(trip)
})

const cancelTrip = asyncHandler( async(req, res) => {
    const { id } = req.params

    const trip = await Trip.findByPk(id)

    if (!trip) {
        res.status(404)
        throw new Error('Trip not found')
    }

    if (trip.userId !== req.user.id) {
        res.status(403)
        throw new Error('Not authorized')
    }

    trip.status = 'cancelled'
    await trip.save()

    res.status(200).json(trip)
})

const getTripsByUser = asyncHandler( async(req, res) => {
    const trips = await Trip.findAll({
        where: { userId: req.user.id }
    })

    res.status(200).json(trips)
})

module.exports = {
    completeTrip,
    cancelTrip,
    getTripsByUser
}
