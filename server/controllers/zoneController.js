import { zoneModel } from "../models/zoneModel.js"
import mongoose from "mongoose"

export default {
    reportZone: async (req, res) => {
        try {

            const { danger_level, description, user_id } = req.body
            const coordinates = req.body.location.coordinates
            if (!danger_level || !description || !coordinates || !user_id) return res.status(400).json({ "msg": "falta un dato" })

            const newReport = {
                danger_level: danger_level,
                description: description,
                location: {
                    coordinates: coordinates
                },
                user_id: user_id
            }

            await zoneModel.create(newReport)
            console.log("se logro")
            return res.status(200).json({ "msg": "se levanto el reporte" })
 
        } catch (err) {
            return res.status(500)({ "msg": "problema de servidor" })
        }
    },
    getZones: async (req, res) => {
        try {

            const zones = await zoneModel.find()
            res.status(200).json(zones)

        } catch (err) {
            return res.status(500)({ "msg": "problema de servidor" })
        }
    },
    getZone: async (req, res) => {
        try {

            const id_zone = req.query._id
            const zone = await zoneModel.findById(id_zone)

            return res.status(200).json(zone)

        }  catch (err) {
            return res.status(500).json({ "msg": "problema de servidor" })
        }
    }
}