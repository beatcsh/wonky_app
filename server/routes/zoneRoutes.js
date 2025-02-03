import { Router } from "express"
import zoneController from "../controllers/zoneController.js"

const router = Router()

router.get("/get", zoneController.getZones)
router.post("/add", zoneController.reportZone)

export default router