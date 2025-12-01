
//locationControllers.js

const asyncHandler = require('express-async-handler')
const Location = require('../models/locationModel')

const getLocations = asyncHandler(async (req, res) => {
    const locations = await Location.find({ user: req.user.id })
    res.status(200).json(locations)
})

const createLocations = asyncHandler(async (req, res) => {
    if (!req.body.name) {
        res.status(400)
        throw new Error('Por favor escribe un nombre para la ubicación')
    }

    const location = await Location.create({
        name: req.body.name,
        city: req.body.city || '',
        country: req.body.country || '',
        user: req.user.id
    })

    res.status(201).json(location)
})

const updateLocations = asyncHandler(async (req, res) => {
    const location = await Location.findById(req.params.id)
    if (!location) {
        res.status(404)
        throw new Error('Ubicación no existe')
    }

    if (location.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Usuario no autorizado')
    } else {
        const locationUpdated = await Location.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(locationUpdated)
    }
})

const deleteLocations = asyncHandler(async (req, res) => {
    const location = await Location.findById(req.params.id)
    if (!location) {
        res.status(404)
        throw new Error('Ubicación no existe')
    }

    if (location.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Usuario no autorizado')
    } else {
        await location.deleteOne()
        res.status(200).json({ id: req.params.id })
    }
})

module.exports = {
    getLocations,
    createLocations,
    updateLocations,
    deleteLocations
}