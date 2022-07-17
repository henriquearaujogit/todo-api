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

app.get('/', (req, res) => (console.log("hello world")))

app.get('/users', async (req, res) =>{
    try {
        const { rows } = await pool.query('select * from users')
        return res.status(200).send(rows)
    } catch (err) {
        return res.status(400),send(err)
    }
})



app.listen(PORT, () => console.log('server running on port: ', PORT))

