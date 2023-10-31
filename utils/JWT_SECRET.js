import dotenv from 'dotenv';
dotenv.config();
export const JWT_SECRET = Buffer.from(
	process.env.JWT_SECRET || 'hfdkshgkjh',
	'base64'
);
