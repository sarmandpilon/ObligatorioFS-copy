import { loginValidatorSchema } from '../validators/login.validator.js'

const validarLoginMiddleware = (req, res, next) => {
    const { error } = loginValidatorSchema.validate(req.body)

    if (error) {
        res.status(400).json({ message: error.message })
        return
    }

    next()
}

export { validarLoginMiddleware }