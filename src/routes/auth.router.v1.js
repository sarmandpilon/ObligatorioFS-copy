import express from 'express'
import { registro, login } from '../controllers/auth.controller.js'
import { validarRegistroMiddleware } from '../middlewares/registro.validator.middleware.js'
import { validarLoginMiddleware } from '../middlewares/login.validator.middleware.js'

const authRouterV1 = express.Router()

authRouterV1.post('/auth/registro/:rol', validarRegistroMiddleware, registro)
authRouterV1.post('/auth/login', validarLoginMiddleware, login)

export { authRouterV1 }