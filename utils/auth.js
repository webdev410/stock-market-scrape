import pkg from 'jsonwebtoken';
import { JWT_SECRET } from './JWT_SECRET.js';

const { verify, sign } = pkg;

const secret = JWT_SECRET;
const expiration = '24h';
export function authMiddleware({ req }) {
	let token = req.body.token || req.query.token || req.headers.authorization;
	if (req.headers.authorization) {
		token = token.split(' ').pop().trim();
	}
	if (!token) {
		return req;
	}
	try {
		const { data } = verify(token, secret, { maxAge: expiration });
		req.user = data;
	} catch {
		console.log('Invalid token: ', token);
	}
	return req;
}
export function signToken({ _id, email, username, name }) {
	const payload = { _id, email, username, name };
	return sign({ data: payload }, secret, { expiresIn: expiration });
}
