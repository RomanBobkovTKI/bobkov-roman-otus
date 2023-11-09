const express = require('express')

const app = express()

require('dotenv').config()

app.use(express.json())

app.get('/api/test', async (req, res) => {
    try {
        return res.status(200).json({
            test: 'Пройден',
        })
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
})

const PORT = 3000

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT)
})