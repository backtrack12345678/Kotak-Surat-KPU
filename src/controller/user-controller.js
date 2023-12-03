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
			accessToken : result
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
export default {register, login, addFeedback}