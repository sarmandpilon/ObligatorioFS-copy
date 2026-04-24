import { crearTipoValidatorSchema, modificarTipoValidatorSchema } from "../validators/tipo.entrenamiento.validator.js"

const validarCrearTipoMiddleware = (req, res, next) => {
    const { error } = crearTipoValidatorSchema.validate(req.body)
    if (error) {
        res.status(400).json({ message: error.message })
        return
    }
    next()
}

const validarModificarTipoMiddleware = (req, res, next) => {
    const { error } = modificarTipoValidatorSchema.validate(req.body)
    if (error) {
        res.status(400).json({ message: error.message })
        return
    }
    next()
}

export { validarCrearTipoMiddleware, validarModificarTipoMiddleware }
