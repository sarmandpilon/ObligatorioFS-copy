import express from 'express'
import { cambiarPlan, subirFotoPerfil } from '../controllers/auth.controller.js'
import { upload } from '../middlewares/upload.middleware.js'

const usuariosRouterV1 = express.Router()

usuariosRouterV1.put('/usuarios/profesor/:email/plan', cambiarPlan)
usuariosRouterV1.put('/usuarios/alumno/:email/foto', upload.single('foto'), subirFotoPerfil)

export { usuariosRouterV1 }