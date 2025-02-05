import { userModel } from "../models/userModel.js"

export default {
    registerUser: async (req, res) => {
        try {

            const { name, apePat, apeMat, email, password, numberPhone } = req.body
            if (!name || !apePat || !apeMat || !email || !password || !numberPhone) return res.status(400).json({ "msg": "algo mal con la entrada" })
            const { streetName, subdivision, number } = req.body.address
            if (!streetName || !subdivision || !number) return res.status(400).json({ "msg": "algo mal con la entrada" })

            const newUser = {
                name: name,
                apePat: apePat,
                apeMat: apeMat,
                email: email,
                password: numberPhone,
                address: {
                    streetName: streetName,
                    subdivision: subdivision,
                    number: number
                }
            }

            await userModel.create(newUser)

            res.status(500).json({ "msg": "todo bien al crear el usuario" })

        } catch (err) {
            return res.status(500)({ "msg": "problema de servidor" })
        }
    }
}