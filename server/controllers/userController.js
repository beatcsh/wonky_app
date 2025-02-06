import { userModel } from "../models/userModel.js"
import { sessionModel } from "../models/sessionModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export default {
    registerUser: async (req, res) => {
        try {

            const { name, apePat, apeMat, email, password, numberPhone } = req.body
            if (!name || !apePat || !apeMat || !email || !password || !numberPhone) return res.status(400).json({ "msg": "algo mal con la entrada" })
            const { streetName, subdivision, number } = req.body.address
            if (!streetName || !subdivision || !number) return res.status(400).json({ "msg": "algo mal con la entrada de la address" })

            const newUser = {
                name: name,
                apePat: apePat,
                apeMat: apeMat,
                email: email,
                numberPhone: numberPhone,
                password: await bcrypt.hash(password, 10),
                address: {
                    streetName: streetName,
                    subdivision: subdivision,
                    number: number
                }
            }

            await userModel.create(newUser)

            res.status(200).json({ "msg": "todo bien al crear el usuario" })

        } catch (err) {
            console.log(err)
            return res.status(500).json({ "msg": "problema de servidor" })
        }
    },
    editUser: async (req, res) => {
        try {

            const id_user = req.query._id
            console.log(id_user)
            const user = await userModel.findById(id_user)
            if (!user) return res.status(400).json({ "msg": "no hay usuario" })

            user.name = req.body.name ? req.body.name : user.name
            user.apePat = req.body.apePat ? req.body.apePat : user.apePat
            user.apeMat = req.body.apeMat ? req.body.apeMat : user.apeMat
            user.email = req.body.email ? req.body.email : user.email
            user.numberPone = req.body.numberPhone ? req.body.numberPhone : user.numberPhone
            user.password = req.body.password ? await bcrypt.hash(req.body.password, 10) : user.password
            user.address = req.body.address ? {
                streetName: req.body.address.streetName || user.address.streetName,
                subdivision: req.body.address.subdivision || user.address.subdivision,
                number: req.body.address.number || user.address.number
            } : user.address;

            await userModel.findByIdAndUpdate(id_user, user)
            res.status(200).json({ "msg": "actualizado" })

        } catch (err) {
            console.log(err)
            return res.status(500).json({ "msg": "problema de servidor" })
        }
    },
    getUsers: async (req, res) => {
        try {

            const data = await userModel.find()
            return res.status(200).send(data)

        } catch (err) {
            return res.status(500).json({ "msg": "problema de servidor" })
        }
    },
    getUser: async (req, res) => {
        try {

            const id_user = req.query._id
            const user = await userModel.findOne({ _id: id_user })

            return res.status(200).json(user)

        } catch (err) {
            return res.status(500).json({ "msg": "problema de servidor" })
        }
    },
    login: async (req, res) => {
        try {

            const { email, password } = req.body
            if (!email || !password) return res.status(400).json({ "msg": "credenciales invalidas" })

            const user = await userModel.findOne({ email })
            if (!user) return res.status(400).json({ "msg": "no hay usuario con este correo" })

            if (!await bcrypt.compare(password, user.password)) return res.status(400).json({ "msg": "contraseña incorrecta" })

            const load = { _id: user._id, email: user.email }
            const token = await jwt.sign(load, process.env.private_key)

            const session = {
                userId: user._id,
                jwt: token
            }

            await sessionModel.create(session)

            return res.status(200).json({ "msg": "login exitoso", token })

        } catch (err) {
            console.log(err)
            return res.status(500).json({ "msg": "problema de servidor" })
        }
    }
}