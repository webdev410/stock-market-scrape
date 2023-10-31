import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
// Initialize nodemailer
const transporter = nodemailer.createTransport({
	host: 'smtp.zoho.com',
	port: 465,
	secure: true,
	// auth: {
	// 	user: process.env.EMAIL_USERNAME || 'no-reply@keiserdev.com',
	// 	pass: process.env.EMAIL_PASSWORD || 'Mus!c4Life',
	// },
	auth: {
		user: 'no-reply@keiserdev.com',
		pass: 'Mus!c4Life',
	},
});

/**
 * Send an email.
 * @param {string} to - Recipient email address.
 * @param {string} subject - Email subject.
 * @param {string} text - Email body text.
 * @param {Array} [attachments] - Optional attachments.
 * @param {object} [replaceInfo] - Optional object with info to replace in email template.
 * @returns {Promise} - Resolves when email is sent, or rejects with error.
 */

// Read HTML file
const templatePath = path.join(path.resolve(), 'email', 'template.html');
const sendEmail = async ({
	to,
	subject,
	text,
	downloadId,
	attachments = [],
	replaceInfo = { homeBuilder: '' },
}) => {
	let htmlContent = fs.readFileSync(templatePath, 'utf8');

	if (downloadId) {
		// const baseUrl = 'https://aegis.keiserdev.com/download/';
		const baseUrl = 'http://localhost:3000/download/';
		const downloadLink = baseUrl + downloadId;
		htmlContent = htmlContent.replace('DOWNLOAD_LINK', downloadLink);
	}

	try {
		if (to) {
			const mailOptions = {
				from: process.env.EMAIL_USERNAME,
				to: to,
				subject: subject || 'Automated email from Keiser Dev',
				text: text || '',
				html: htmlContent || '',
				attachments: attachments,
			};

			await transporter.sendMail(mailOptions);
			console.log(`Email sent to ${to}`);
		} else console.log(`No email address provided`);
		return;
	} catch (error) {
		console.error('Error sending email:', error);
		throw error;
	}
};

export default sendEmail;
