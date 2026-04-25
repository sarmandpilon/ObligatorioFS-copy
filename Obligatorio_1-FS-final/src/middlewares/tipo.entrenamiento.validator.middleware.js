import { crearTipoEntrenamientoValidatorSchema } from '../validators/tipo.entrenamiento.validator.js'

const validarCrearTipoEntrenamientoMiddleware = (req, res, next) => {
    const { error } = crearTipoEntrenamientoValidatorSchema.validate(req.body)

    if (error) {
        res.status(400).json({ message: error.message })
        return
    }

    next()
}

export { validarCrearTipoEntrenamientoMiddleware }