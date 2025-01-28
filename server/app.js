import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import express from 'express'

/* empiecen a hacer unos modelos como con jessica, 
 orita les pongo aqui los ejemplos de como van a quedar y cuantos

 sessions 
{
  "userId": "1",
  "jwt": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MTk5MDkzMjEsIm5iZiI6MTUxOTkwOTMyMSwianRpIjoiNmJlZDAwMWYtNTFiYi00NzVhLTgxZDAtMDcwNGE5Mjk0MWZlIiwiZXhwIjoxNTE5OTEwMjIxLCJpZGVudGl0eSI6eyJlbWFpbCI6InQzcXVsZmVlbUBrd2l2NS42dXIiLCJuYW1lIjoiM2lveHJtZnF4IiwicGFzc3dvcmQiOm51bGx9LCJmcmVzaCI6ZmFsc2UsInR5cGUiOiJhY2Nlc3MiLCJ1c2VyX2NsYWltcyI6eyJ1c2VyIjp7ImVtYWlsIjoidDNxdWxmZWVtQGt3aXY1LjZ1ciIsIm5hbWUiOiIzaW94cm1mcXgiLCJwYXNzd29yZCI6bnVsbH19fQ.ejtr_NyZyBronWMKuE0RFTjWej--T0zGrdc_iymGtVs"
}

 users
{
  "name": "moon",
  "apePat": "m",
  "apeMat": "m",
  "email": "moon@gmail.com",
  "password": "moon",
  "numberPhone": {
    "$numberLong": "4497894512"
  },
  "address": {
    "streetName": "keo",
    "subdivision": "keoland",
    "number": 123
  },
  "emerContact": {
    "name": "beat",
    "email": "beat@gmail.com",
    "numberPhone": {
      "$numberLong": "4497894563"
    }
  }
}

 zones
{
  "dangerLevel": "high",
  "description": "Tipo extraño (beto) en las cercanias de este lugar",
  "location": {
    "type": "Point",
    "coordinates": [
      -102.2549082,
      21.921501
    ]
  }
}

*/

dotenv.config()

mongoose.connect(process.env.url)
    .then(() => console.log('conectado a la bd'))
    .catch((err) => console.log('no se pudo conectar', err))

const app = express()
app.use(cors())

app.listen((4000, () => console.log('funciona')))