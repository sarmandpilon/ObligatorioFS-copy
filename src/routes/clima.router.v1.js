import express from 'express'
import { obtenerClima } from '../controllers/clima.controller.js'

const climaRouterV1 = express.Router()

climaRouterV1.get('/clima/:ciudad', obtenerClima)

export { climaRouterV1 }