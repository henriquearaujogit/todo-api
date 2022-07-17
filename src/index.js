const express = require('express')
const cors = require('cors')
const { Pool } = require('pg')
const { async } = require('rxjs')
require('dotenv').config()

const app = express()

const PORT = process.env.PORT  || 3333

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL
})

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    return res.status(200).send("active")
})

app.get('/users', async (req, res) =>{
    try {
        const { rows } = await pool.query('select * from users')
        return res.status(200).send(rows)
    } catch (err) {
        return res.status(400).send(err)
    }
})

app.post('/registration', async (req, res) =>{
    const { username } = req.body
    try {
        const newUser = await pool.query('INSERT INTO users(user_name) VALUES ($1)', [username])
        return res.status(200).send('user successful added', newUser)
    } catch (error) {
        return res.status(400).send(error)
    }
})

app.listen(PORT, () => console.log('server running on port: ', PORT))

