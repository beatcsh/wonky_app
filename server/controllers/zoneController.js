import { zoneModel } from "../models/zoneModel.js"
import mongoose from "mongoose"

export default {
    reportZone: async (req, res) => {
        try {

            const { dangerLevel, description, cordinates } = req.body
            if (!dangerLevel || !description || !cordinates) return res.status(400).json({ "msg": "falta un dato" })

            const newReport = {
                dangerLevel: req.body.dangerLevel,
                description: req.body.description,
                location: {
                    coordinates: req.body.coordinates
                }
            }

            await zoneModel.create(newReport)
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