import Joi from "joi"

const loginValidatorSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(1).required()
})

export { loginValidatorSchema }
