import bcrypt from "bcrypt";
import {validate} from "../validation/validation.js";
import {feedbackValidation, loginValidation, registerValidation} from "../validation/user-validation.js";
import {prismaClient} from "../application/database.js";
import {CustomErorr} from "../error/custom-erorr.js";
import jwt from "jsonwebtoken";
import {sendEmail} from "../utils/send-email.js";

const register = async (request) => {
	const registerRequest = validate(registerValidation, request);

	const countUser = await prismaClient.user.count({
		where: {
			email: registerRequest.email.toLowerCase()
		}
	});

	if(countUser === 1) {
		throw new CustomErorr(400, "Email Sudah Terdaftar");
	}

	const hashedPassword = await bcrypt.hash(registerRequest.password, 10);

	return prismaClient.user.create({
		data: {
			email: registerRequest.email.toLowerCase(),
			password: hashedPassword
		},
		select: {
			id: true,
			created_at: true
		}
	})
}

const login = async (request) => {
	const loginRequest = validate(loginValidation, request);

	const user = await prismaClient.user.findUnique({
		where: {
			email: loginRequest.email.toLowerCase()
		},
		select: {
			id: true,
			password: true,
			role: true,
		}
	})

	if(!user) {
		throw new CustomErorr(401,'Email dan Password Tidak Valid');
	}

	const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);

	if(!isPasswordValid) {
		throw new CustomErorr(401,'Email dan Password Tidak Valid');
	}

	const accessToken = jwt.sign({
		id: user.id,
		email: loginRequest.email
	}, process.env.JWT_ACCESS_TOKEN_SECRET, {expiresIn: '30d'})

	return {accessToken, role: user.role};
}

const addFeedback = async (request) => {
	const feedbackRequest = validate(feedbackValidation, request.body);
	const userEmail = request.user.email;

	return prismaClient.$transaction(async (prisma) => {
		const feedback =  await prisma.feedback.create({
			data: {
				user_email: userEmail,
				...feedbackRequest,
			}
		})

		await sendEmail(feedback);

		const { id, user_email: email, name, message, created_at} = feedback

		return {
			id,
			email,
			name,
			message,
			created_at,
			responseMessage: "Pengaduan Berhasil Dikirim"
		};
	})
}

const getAllFeedbacks = async (request) => {
	const { role } = request;

	if (role !== 'admin') {
		throw new CustomErorr(403, 'Anda Tidak Boleh Mengakses Endpoint Ini')
	}

	return prismaClient.feedback.findMany();
}

export default {
	register,
	login,
	addFeedback,
	getAllFeedbacks
}