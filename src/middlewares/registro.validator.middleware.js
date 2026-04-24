import { registroValidatorSchema } from "../validators/registro.validator.js"

const validarRegistroMiddleware = (req, res, next) => {
    const { error } = registroValidatorSchema.validate(req.body)
    if (error) {
        res.status(400).json({ message: error.message })
        return
    }
    next()
}

export { validarRegistroMiddleware }
