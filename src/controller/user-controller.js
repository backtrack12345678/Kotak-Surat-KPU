import userService from "../service/user-service.js";

const register = async (req, res, next) => {
	try {
		const result = await userService.register(req.body);
		res.status(201).json({
			status: 'success',
			message: "Registrasi Berhasil",
			data: result
		});
	} catch (e){
		next(e)
	}
}

const login = async (req, res, next) => {
	try {
		const result = await userService.login(req.body);
		res.status(200).json({
			status: 'success',
			message: 'Login Berhasil',
			data: {
				role: result.role,
				accessToken : result.accessToken
			}
		})
	} catch (e) {
		next(e)
	}
}

const addFeedback = async (req, res, next) => {
	try {
		const result = await userService.addFeedback(req);
		const {responseMessage, ...data} = result;
		res.status(201).json({
			status: "success",
			message: responseMessage,
			data
		});
	} catch (e) {
		next(e)
	}
}

const getAllFeedbacks = async (req, res, next) => {
	try{
		const result = await userService.getAllFeedbacks(req.user);
		res.status(200).json({
			status: 'success',
			message: 'Data Berhasail DiDapatkan',
			data: result
		});
	} catch (e) {
		next(e);
	}
}

export default {register, login, addFeedback, getAllFeedbacks}