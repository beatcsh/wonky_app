import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import express from 'express'
import zoneRoutes from './routes/zoneRoutes.js'
import userRoutes from "./routes/userRoutes.js"
dotenv.config()

mongoose.connect(process.env.url)
    .then(() => console.log('conectado a la bd'))
    .catch((err) => console.log('no se pudo conectar', err))

const app = express()
app.use(express.json())
app.use(cors())


app.use("/zones", zoneRoutes)
app.use("/users", userRoutes)

app.listen(4000, () => console.log('Funciona'));