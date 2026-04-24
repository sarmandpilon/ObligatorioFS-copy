import express from 'express'
import {
    crearTipoEntrenamiento,
    obtenerTiposEntrenamiento,
    obtenerTipoEntrenamientoPorId,
    modificarTipoEntrenamiento,
    eliminarTipoEntrenamiento
} from '../controllers/tipos.entrenamiento.controller.js'
import { validarCrearTipoEntrenamientoMiddleware } from '../middlewares/tipo.entrenamiento.validator.middleware.js'
import { soloProfesor } from '../middlewares/roles.middleware.js'

const tiposEntrenamientoRouterV1 = express.Router()

tiposEntrenamientoRouterV1.post('/tipos-entrenamiento', soloProfesor, validarCrearTipoEntrenamientoMiddleware, crearTipoEntrenamiento)
tiposEntrenamientoRouterV1.get('/tipos-entrenamiento', obtenerTiposEntrenamiento)
tiposEntrenamientoRouterV1.get('/tipos-entrenamiento/:id', obtenerTipoEntrenamientoPorId)
tiposEntrenamientoRouterV1.put('/tipos-entrenamiento/:id', soloProfesor, modificarTipoEntrenamiento)
tiposEntrenamientoRouterV1.delete('/tipos-entrenamiento/:id', soloProfesor, eliminarTipoEntrenamiento)

export { tiposEntrenamientoRouterV1 }