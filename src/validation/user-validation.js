import Joi from "joi";
const registerValidation = Joi.object({
	email: Joi.string().max(100).email().required(),
	password: Joi.string().min(6).max(12).required(),
})

const loginValidation = Joi.object({
	email: Joi.string().max(100).email().required(),
	password: Joi.string().min(6).max(12).required(),
})

const feedbackValidation = Joi.object({
	ktp: Joi.string().max(16).required(),
	name: Joi.string().max(255).required(),
	phone: Joi.string().max(20).required(),
	occupation: Joi.string().max(50).required(),
	address: Joi.string().max(150).required(),
	message: Joi.string().required()
})

export {registerValidation, loginValidation, feedbackValidation};