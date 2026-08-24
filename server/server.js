require('dotenv').config();

const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const sequelize = require('./config/connectDB')
const { readdirSync } = require('fs');
const { fork } = require('cluster');

require('./models/Association')


//ตั้งค่าพอร์ต
const PORT = 5001

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

readdirSync('./routes').map((items)=>{
    app.use('/api',require('./routes/'+ items))
})

//ทำ function start server
async function startserver() {
    while (true) {
        try {
            await sequelize.authenticate()
            console.log('Connect to database successfully!!')

            // await sequelize.sync({ force: true })
            // console.log('Database Sync!')

            break
        } catch (err) {
            console.log(err.message)
            console.log('Retry in 5 seconds...')
            await new Promise((resolve) => setTimeout(resolve, 5000))
        }
    }

    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`)
    })
}

startserver()