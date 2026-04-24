import Joi from "joi"

const crearSesionValidatorSchema = Joi.object({
    fecha: Joi.string().isoDate().required(),
    alumnoEmail: Joi.string().email().required(),
    tipoEntrenamiento: Joi.string().min(2).required(),
    descripcion: Joi.string().max(500),
    calentamiento: Joi.object({
        duracion: Joi.number().integer().min(0)
    }),
    trabajoPrincipal: Joi.object({
        descripcion: Joi.string(),
        distancia: Joi.number().min(0),
        unidad: Joi.string(),
        cantidad: Joi.number().integer().min(0)
    }),
    vueltaCalma: Joi.object({
        duracion: Joi.number().integer().min(0)
    })
})

export { crearSesionValidatorSchema }
