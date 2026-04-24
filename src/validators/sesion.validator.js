import Joi from 'joi'
//define los campos obligatorios y las longitudes, el middleware va a usar para 
//validar los datos que vienen en el body de la request
const crearSesionValidatorSchema = Joi.object({
    fecha: Joi.string().required().messages({
        'string.empty': 'La fecha es obligatoria',
        'any.required': 'La fecha es obligatoria'
    }),
    alumnoEmail: Joi.string().email().required().messages({
        'string.email': 'El email del alumno no tiene un formato válido',
        'string.empty': 'El email del alumno es obligatorio',
        'any.required': 'El email del alumno es obligatorio'
    }),
    tipoEntrenamiento: Joi.string().required().messages({
        'string.empty': 'El tipo de entrenamiento es obligatorio',
        'any.required': 'El tipo de entrenamiento es obligatorio'
    }),
    descripcion: Joi.string().max(500).optional().messages({
        'string.max': 'La descripción no puede superar los 500 caracteres'
    }),
    calentamiento: Joi.object({
        duracion: Joi.number().min(0).required().messages({
            'number.base': 'La duración del calentamiento debe ser un número',
            'number.min': 'La duración del calentamiento no puede ser negativa',
            'any.required': 'La duración del calentamiento es obligatoria'
        })
    }).required().messages({
        'any.required': 'El calentamiento es obligatorio'
    }),
    trabajoPrincipal: Joi.object({
        descripcion: Joi.string().required().messages({
            'string.empty': 'La descripción del trabajo principal es obligatoria',
            'any.required': 'La descripción del trabajo principal es obligatoria'
        }),
        distancia: Joi.number().min(0).required().messages({
            'number.base': 'La distancia debe ser un número',
            'number.min': 'La distancia no puede ser negativa',
            'any.required': 'La distancia es obligatoria'
        }),
        unidad: Joi.string().valid('metros', 'km', 'minutos').required().messages({
            'any.only': 'La unidad debe ser metros, km o minutos',
            'any.required': 'La unidad es obligatoria'
        }),
        cantidad: Joi.number().min(1).optional().messages({
            'number.base': 'La cantidad debe ser un número',
            'number.min': 'La cantidad debe ser al menos 1'
        })
    }).required().messages({
        'any.required': 'El trabajo principal es obligatorio'
    }),
    vueltaCalma: Joi.object({
        duracion: Joi.number().min(0).required().messages({
            'number.base': 'La duración de la vuelta a la calma debe ser un número',
            'number.min': 'La duración de la vuelta a la calma no puede ser negativa',
            'any.required': 'La duración de la vuelta a la calma es obligatoria'
        })
    }).required().messages({
        'any.required': 'La vuelta a la calma es obligatoria'
    })
})

export { crearSesionValidatorSchema }