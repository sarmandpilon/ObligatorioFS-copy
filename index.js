import 'dotenv/config'
import express from 'express'
import { authRouterV1 } from './src/routes/auth.router.v1.js'
import { sesionesRouterV1 } from './src/routes/sesiones.router.v1.js'
import { tiposEntrenamientoRouterV1 } from './src/routes/tipos.entrenamiento.router.v1.js'
import { usuariosRouterV1 } from './src/routes/usuarios.router.v1.js'
import { climaRouterV1 } from './src/routes/clima.router.v1.js'
import { logMiddleware } from './src/middlewares/logger.middleware.js'
import { authMiddleware } from './src/middlewares/auth.middleware.js'
import { conectarBD } from './src/config/db_config.js'

const app = express()

app.use(express.json())

app.use(logMiddleware)

// Ping público
app.get('/ping', (req, res) => res.json({ message: 'pong' }))

// Rutas públicas
app.use('/v1', authRouterV1)

// Rutas privadas
app.use(authMiddleware)
app.use('/v1', sesionesRouterV1)
app.use('/v1', tiposEntrenamientoRouterV1)
app.use('/v1', usuariosRouterV1)
app.use('/v1', climaRouterV1)

// Conecta a la base de datos
conectarBD()

const PORT = process.env.PORT || 3005
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})