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

const sequelize = require('./config/postgresdb')
require('./models') // Importar modelos y relaciones

async function connectPG() {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL Connected'.cyan.underline);
    await sequelize.sync();
  } catch (error) {
    console.error('Unable to connect to the PostgreSQL database:'.red, error);
  }
}

connectPG();

app.listen(port, ()=> console.log(`Servidor Iniciado en el puerto ${port}`))