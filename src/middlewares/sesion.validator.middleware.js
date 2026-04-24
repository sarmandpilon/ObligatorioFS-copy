import { crearSesionValidatorSchema } from "../validators/sesion.validator.js"

const validarCrearSesionMiddleware = (req, res, next) => {
    const { error } = crearSesionValidatorSchema.validate(req.body)
    if (error) {
        res.status(400).json({ message: error.message })
        return
    }
    next()
}

export { validarCrearSesionMiddleware }
