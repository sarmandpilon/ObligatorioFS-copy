import Joi from "joi"

const crearTipoValidatorSchema = Joi.object({
    nombre: Joi.string().min(2).max(100).required(),
    descripcion: Joi.string().min(5).max(500).required()
})

const modificarTipoValidatorSchema = Joi.object({
    nombre: Joi.string().min(2).max(100),
    descripcion: Joi.string().min(5).max(500)
})

export { crearTipoValidatorSchema, modificarTipoValidatorSchema }
