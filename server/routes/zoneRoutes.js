import { Router } from "express"
import zoneController from "../controllers/zoneController.js"

const router = Router()

router.post("/add", zoneController.reportZone)
router.get("/get", zoneController.getZones)
router.get("/get-zone", zoneController.getZone)

export default router