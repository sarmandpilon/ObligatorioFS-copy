import Joi from "joi"

const registroValidatorSchema = Joi.object({
    nombre: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
})

export { registroValidatorSchema }
