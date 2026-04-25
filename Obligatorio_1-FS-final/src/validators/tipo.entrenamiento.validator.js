import Joi from 'joi'

const crearTipoEntrenamientoValidatorSchema = Joi.object({
    nombre: Joi.string().min(2).max(100).required().messages({
        'string.min': 'El nombre debe tener al menos 2 caracteres',
        'string.max': 'El nombre no puede superar los 100 caracteres',
        'string.empty': 'El nombre es obligatorio',
        'any.required': 'El nombre es obligatorio'
    }),
    descripcion: Joi.string().max(500).optional().messages({
        'string.max': 'La descripción no puede superar los 500 caracteres'
    })
})

export { crearTipoEntrenamientoValidatorSchema }