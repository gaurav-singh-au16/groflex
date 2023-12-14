const express = require('express')
const cors = require('cors');
const db = require('./helpers/db.helper')
const router = require('./routes')


const app = express()

app.use(express.json())
app.use(cors());
app.use(router);

// db connection
db.sync({alter: true}).then(() => {
    console.log('Database Connected!')
}).catch((err) => {
    console.log('Error => ', err)
})


// test route
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Working!'
    })
})

module.exports = app