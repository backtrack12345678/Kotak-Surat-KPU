import {CustomErorr} from "../error/custom-erorr.js";
import jwt from "jsonwebtoken";
import {prismaClient} from "../application/database.js";

export const authMiddleware = async (req, res, next) => {
	try {
		const accessToken = req.headers.authorization?.split(" ")[1];

		if(!accessToken) {
			throw new CustomErorr(401, "Anda Belum Login, Silahkan Login!");
		}

		const verified = await jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET);

		const user = await prismaClient.user.findUnique({
			where: {
				id: verified.id,
				email: verified.email
			},
			select: {
				id: true,
				email: true,
				role: true
			}
		})

		if(!user) {
			throw new CustomErorr(401, "Anda Belum Login, Silahkan Login!");
		}

		req.user = {
			id: user.id,
			email: user.email,
			role: user.role
		}
		next();
	} catch (e) {
		next(e)
	}
}