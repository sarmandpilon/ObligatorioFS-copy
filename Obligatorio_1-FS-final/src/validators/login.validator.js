import Joi from 'joi'

const loginValidatorSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'El email no tiene un formato válido',
        'string.empty': 'El email es obligatorio',
        'any.required': 'El email es obligatorio'
    }),
    password: Joi.string().required().messages({
        'string.empty': 'La contraseña es obligatoria',
        'any.required': 'La contraseña es obligatoria'
    })
})

export { loginValidatorSchema }