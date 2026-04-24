import express from "express"
import { obtenerTodos, obtenerPorId, crear, modificar, eliminar } from "../controllers/tipos.entrenamiento.controller.js"
import { validarCrearTipoMiddleware, validarModificarTipoMiddleware } from "../middlewares/tipo.entrenamiento.validator.middleware.js"

const tiposEntrenamientoRouterV1 = express.Router()

tiposEntrenamientoRouterV1.get("/tipos-entrenamiento", obtenerTodos)
tiposEntrenamientoRouterV1.get("/tipos-entrenamiento/:id", obtenerPorId)
tiposEntrenamientoRouterV1.post("/tipos-entrenamiento", validarCrearTipoMiddleware, crear)
tiposEntrenamientoRouterV1.put("/tipos-entrenamiento/:id", validarModificarTipoMiddleware, modificar)
tiposEntrenamientoRouterV1.delete("/tipos-entrenamiento/:id", eliminar)

export { tiposEntrenamientoRouterV1 }
