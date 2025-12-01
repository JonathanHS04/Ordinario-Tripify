const express = require('express')
const router = express.Router()
const { 
    getTasksByLocation, 
    getTasksByUser, 
    addTaskToUser, 
    completeTask, 
    cancelTask 
} = require('../controllers/tasksControllers')
const { protect } = require('../middleware/authMiddleware')

router.get('/location/:locationId', protect, getTasksByLocation)
router.get('/user', protect, getTasksByUser)
router.post('/', protect, addTaskToUser)
router.put('/complete/:id', protect, completeTask)
router.put('/cancel/:id', protect, cancelTask)

module.exports = router
