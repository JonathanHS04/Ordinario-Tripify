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
    
    const tasks = await Task.findAll({
        where: { locationId }
    })
    
    res.status(200).json(tasks)
})

const getTasksByUser = asyncHandler( async(req, res) => {
    const { userId } = req.params
    
    const user = await User.findByPk(userId)
    if (!user) {
        res.status(404)
        throw new Error('Usuario no encontrado')
    }
    
    const tasks = await user.getTasks()
    res.status(200).json(tasks)
})

const addTaskToUser = asyncHandler( async(req, res) => {
    const { userId } = req.params
    const { taskId } = req.body
    
    const user = await User.findByPk(userId)
    if (!user) {
        res.status(404)
        throw new Error('Usuario no encontrado')
    }
    
    const task = await Task.findByPk(taskId)
    if (!task) {
        res.status(404)
        throw new Error('Tarea no encontrada')
    }
    
    await user.addTask(task)
    res.status(201).json({ message: 'Tarea asignada al usuario', task })
})

const completeTask = asyncHandler( async(req, res) => {
    const { taskId } = req.params
    
    const task = await Task.findByPk(taskId)
    if (!task) {
        res.status(404)
        throw new Error('Tarea no encontrada')
    }
    
    task.completed = true
    await task.save()
    
    res.status(200).json({ message: 'Tarea completada', task })
})

const cancelTask = asyncHandler( async(req, res) => {
    const { taskId } = req.params
    
    const task = await Task.findByPk(taskId)
    if (!task) {
        res.status(404)
        throw new Error('Tarea no encontrada')
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