import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import express from 'express'

dotenv.config()

mongoose.connect(process.env.url)
    .then(() => console.log('conectado a la bd'))
    .catch((err) => console.log('no se pudo conectar', err))

const app = express()
app.use(cors())

app.listen((4000, () => console.log('funciona')))