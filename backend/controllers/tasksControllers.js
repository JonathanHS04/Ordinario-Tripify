const asyncHandler = require('express-async-handler')
const Task = require('../models/tasksModel')
const Location = require('../models/locationsModel')
const User = require('../models/usersModel')

const getTasksByLocation = asyncHandler( async(req, res) => {
    const { locationId } = req.params
    
    const location = await Location.findByPk(locationId)
    if (!location) {
        res.status(404)
        throw new Error('Ubicación no encontrada')
    }
    
    // Retorna tareas "plantilla" (sin usuario asignado)
    const tasks = await Task.findAll({
        where: { 
            locationId,
            userId: null 
        }
    })
    
    res.status(200).json(tasks)
})

const getTasksByUser = asyncHandler( async(req, res) => {
    const userId = req.user.id
    
    const user = await User.findById(userId)
    if (!user) {
        res.status(404)
        throw new Error('Usuario no encontrado')
    }
    
    const tasks = await Task.findAll({
        where: { userId }
    })
    
    res.status(200).json(tasks)
})

const addTaskToUser = asyncHandler( async(req, res) => {
    const userId = req.user.id
    const { taskId } = req.body
    
    const user = await User.findById(userId)
    if (!user) {
        res.status(404)
        throw new Error('Usuario no encontrado')
    }
    
    const templateTask = await Task.findByPk(taskId)
    if (!templateTask) {
        res.status(404)
        throw new Error('Tarea no encontrada')
    }

    // Crear una copia de la tarea para el usuario
    const newTask = await Task.create({
        locationId: templateTask.locationId,
        title: templateTask.title,
        details: templateTask.details,
        points: templateTask.points,
        completed: false,
        userId: userId
    })
    
    res.status(201).json({ message: 'Tarea asignada al usuario', task: newTask })
})

const completeTask = asyncHandler( async(req, res) => {
    const { id } = req.params
    
    const task = await Task.findByPk(id)
    if (!task) {
        res.status(404)
        throw new Error('Tarea no encontrada')
    }
    
    if (task.userId !== req.user.id) {
        res.status(401)
        throw new Error('No autorizado para completar esta tarea')
    }

    task.completed = true
    await task.save()
    
    res.status(200).json({ message: 'Tarea completada', task })
})

const cancelTask = asyncHandler( async(req, res) => {
    const { id } = req.params
    
    const task = await Task.findByPk(id)
    if (!task) {
        res.status(404)
        throw new Error('Tarea no encontrada')
    }

    if (task.userId !== req.user.id) {
        res.status(401)
        throw new Error('No autorizado')
    }
    
    task.completed = false
    await task.save()
    
    res.status(200).json({ message: 'Tarea cancelada', task })
})

module.exports = {
    getTasksByLocation,
    getTasksByUser,
    addTaskToUser,
    completeTask,
    cancelTask,
}