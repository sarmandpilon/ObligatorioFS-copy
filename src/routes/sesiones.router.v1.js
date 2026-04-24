import express from 'express'
import { 
    crearSesion, 
    obtenerSesiones, 
    obtenerSesionPorId, 
    modificarSesion, 
    eliminarSesion,
    generarSesionConIA
} from '../controllers/sesiones.controller.js'
import { validarCrearSesionMiddleware } from '../middlewares/sesion.validator.middleware.js'
import { soloProfesor } from '../middlewares/roles.middleware.js'

const sesionesRouterV1 = express.Router()

sesionesRouterV1.post('/sesiones', soloProfesor, validarCrearSesionMiddleware, crearSesion)
sesionesRouterV1.get('/sesiones', obtenerSesiones)
sesionesRouterV1.get('/sesiones/generar/:alumnoEmail', soloProfesor, generarSesionConIA)
sesionesRouterV1.get('/sesiones/:id', obtenerSesionPorId)
sesionesRouterV1.put('/sesiones/:id', soloProfesor, modificarSesion)
sesionesRouterV1.delete('/sesiones/:id', soloProfesor, eliminarSesion)

export { sesionesRouterV1 }