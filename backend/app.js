const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/travelplanner')
.then(() => console.log('Connected to MongoDB'))
app.use(express.json())

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})