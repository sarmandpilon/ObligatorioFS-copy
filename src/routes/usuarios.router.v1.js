import express from "express"
import multer from "multer"
import { cambiarPlan, subirFoto } from "../controllers/usuarios.controller.js"

const usuariosRouterV1 = express.Router()

const upload = multer()

usuariosRouterV1.put("/usuarios/profesor/:email/plan", cambiarPlan)
usuariosRouterV1.put("/usuarios/alumno/:email/foto", upload.single("foto"), subirFoto)

export { usuariosRouterV1 }
