import Joi from 'joi'

const registroValidatorSchema = Joi.object({
    nombre: Joi.string().min(2).max(100).required().messages({
        'string.min': 'El nombre debe tener al menos 2 caracteres',
        'string.max': 'El nombre no puede superar los 100 caracteres',
        'string.empty': 'El nombre es obligatorio',
        'any.required': 'El nombre es obligatorio'
    }),
    email: Joi.string().email().required().messages({//validar si es unico
        'string.email': 'El email no tiene un formato válido',
        'string.empty': 'El email es obligatorio',
        'any.required': 'El email es obligatorio'
    }),
    password: Joi.string().min(6).max(50).required().messages({
        'string.min': 'La contraseña debe tener al menos 6 caracteres',
        'string.max': 'La contraseña no puede superar los 50 caracteres',
        'string.empty': 'La contraseña es obligatoria',
        'any.required': 'La contraseña es obligatoria'
    })
})

export { registroValidatorSchema }