import nodemailer from "nodemailer"
export const sendEmail = async (data) => {
	const mailTransporter = nodemailer.createTransport({
		service: "gmail",
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
			user: process.env.EMAIL || "kotaksuratkpu@gmail.com",
			pass: "sizr fipx ixuz kqkq"
		}
	});

	const messageTemplate = `
		Pengaduan
		Nama          = ${data.name}
		Alamat        = ${data.address}
		Nomor Telepon = ${data.phone}
		Email         = ${data.user_email}
		Pekerjaan     = ${data.occupation}
		No. KTP       = ${data.ktp}
		Aduan         = ${data.message}
	`

	const mailOptions = {
		from: "kotaksuratkpu@gmail.com",
		to: 'semvakbaulu@gmail.com',
		subject: "Kotak Saran KPU",
		text: messageTemplate
	}

	await mailTransporter.sendMail(mailOptions);
}
