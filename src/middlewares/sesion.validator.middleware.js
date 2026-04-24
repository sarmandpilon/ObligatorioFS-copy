import { crearSesionValidatorSchema } from '../validators/sesion.validator.js'

//verifica que los datos que vienen en el body esten bien antes de dejar pasar 
//la request y despyes va al controlador
const validarCrearSesionMiddleware = (req, res, next) => {
    const { error } = crearSesionValidatorSchema.validate(req.body)

    if (error) {
        res.status(400).json({ message: error.message })
        return
    }

    next()
}

export { validarCrearSesionMiddleware }