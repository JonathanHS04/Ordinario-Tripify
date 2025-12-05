const asyncHandler = require('express-async-handler')
const Trip = require('../models/tripsModel')
const Location = require('../models/locationsModel')

const createTrip = asyncHandler(async (req, res) => {
    const { locationId, endDate } = req.body

    if (!locationId || !endDate) {
        res.status(400)
        throw new Error('Por favor proporciona locationId y endDate')
    }

    const location = await Location.findByPk(locationId)
    if (!location) {
        res.status(404)
        throw new Error('Ubicación no encontrada')
    }

    const trip = await Trip.create({
        locationId,
        userId: req.user.id,
        startedDate: new Date(),
        endDate: new Date(endDate),
        status: 'active'
    })

    res.status(201).json(trip)
})

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
    createTrip,
    completeTrip,
    cancelTrip,
    getTripsByUser
}
