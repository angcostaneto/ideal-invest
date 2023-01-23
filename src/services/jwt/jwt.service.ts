import * as jwt from 'jsonwebtoken';
import { JwtInterface } from './jwt.interface';

/**
 * Verify and decrypt token
 *
 * @param token string
 * @returns
 */
export const verifyJwt = async (token: string) => {
	return await jwt.verify(token, process.env.AUTH_SECRET as string);
};

/**
 *	Create token.
 *
 * @param data JwtInterface
 * @returns string
 */
export const createToken = async (data: JwtInterface) => {
	return jwt.sign(data, process.env.AUTH_SECRET as string);
};
