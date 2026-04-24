import express from "express"
import { obtenerSesiones, obtenerPorId, crear, modificar, eliminar, generarConIA } from "../controllers/sesiones.controller.js"
import { validarCrearSesionMiddleware } from "../middlewares/sesion.validator.middleware.js"

const sesionesRouterV1 = express.Router()

sesionesRouterV1.get("/sesiones/generar/:alumnoEmail", generarConIA)
sesionesRouterV1.get("/sesiones", obtenerSesiones)
sesionesRouterV1.get("/sesiones/:id", obtenerPorId)
sesionesRouterV1.post("/sesiones", validarCrearSesionMiddleware, crear)
sesionesRouterV1.put("/sesiones/:id", modificar)
sesionesRouterV1.delete("/sesiones/:id", eliminar)

export { sesionesRouterV1 }
