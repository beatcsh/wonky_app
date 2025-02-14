import { Router } from "express"
import UserController from "../controllers/userController.js"

const router = Router()

router.post("/add", UserController.registerUser)
router.put("/edit", UserController.editUser)
router.get("/all", UserController.getUsers)
router.get("/get-one", UserController.getUser)
router.post("/login", UserController.login)
router.put("/add_contact", UserController.addContact)

export default router 