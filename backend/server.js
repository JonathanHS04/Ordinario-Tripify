const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5001
const connectMongoDB = require('./config/mongodb')
const {errorHandler} = require('./middleware/errorMiddleware')
const cors = require('cors')

connectMongoDB()

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/users', require('./routes/usersRoutes'))
app.use('/api/trips', require('./routes/tripsRoutes'))
app.use('/api/locations', require('./routes/locationsRoutes'))
app.use('/api/tasks', require('./routes/tasksRoutes'))

app.use(errorHandler)

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conexión exitosa a la base de datos');
  } catch (error) {
    console.error('No se pudo conectar:', error);
  }
}

testConnection();

app.listen(port, ()=> console.log(`Servidor Iniciado en el puerto ${port}`))