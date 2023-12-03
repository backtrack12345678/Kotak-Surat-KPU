import {CustomErorr} from "../error/custom-erorr.js";
import jwt from "jsonwebtoken";

const errorMiddleware = (err, req, res, next) => {
	if(!err) {
		next();
		return
	}

	if(err instanceof CustomErorr) {
		res.status(err.status).json({
			status: "error",
			message: err.message
		}).end();
	} else if([jwt.NotBeforeError, jwt.TokenExpiredError, jwt.JsonWebTokenError].some(errorClass => err instanceof errorClass)) {
		res.status(401).json({
			status: "error",
			message: "Anda Belum Login, Silahkan Login!",
		}).end();
	} else {
		res.status(500).json({
			status: "error",
			message: err.message,
		}).end();
	}
}

export {errorMiddleware}