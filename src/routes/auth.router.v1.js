import express from "express"
import { login, registrarAlumno, registrarProfesor } from "../controllers/auth.controller.js"
import { validarRegistroMiddleware } from "../middlewares/registro.validator.middleware.js"
import { validarLoginMiddleware } from "../middlewares/login.validator.middleware.js"

const authRouterV1 = express.Router()

authRouterV1.post("/auth/registro/alumno", validarRegistroMiddleware, registrarAlumno)
authRouterV1.post("/auth/registro/profesor", validarRegistroMiddleware, registrarProfesor)
authRouterV1.post("/auth/login", validarLoginMiddleware, login)

export { authRouterV1 }
