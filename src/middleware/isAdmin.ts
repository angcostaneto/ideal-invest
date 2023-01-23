import { cacheGet, JwtInterface, verifyJwt } from '@services';
import { Request, Response, NextFunction } from 'express';

/**
 *	Verify if is admin
 *
 * @param request Request
 * @param response Response
 * @param next NextFunction
 * @returns
 */
export const verifyIsAdmin = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const token: string = request.headers.authorization as string;

	if (!token) {
		return response.status(403).send({
			message: 'No token provided!'
		});
	}

	// Check if token is on blacklist in redis
	const isBlackListed = await cacheGet(token);
	if (isBlackListed) {
		return response.status(401).json({ message: 'Unauthorized' });
	}

	try {
		const decoded = await verifyJwt(token.split(' ')[1]);

		const { id, isAdmin } = decoded as JwtInterface;
		response.locals.userId = id;

		if (isAdmin) {
			return next();
		}

		return response.status(401).send({ message: 'Unauthorized!' });
	} catch (error) {
		return response.status(401).send({ message: 'Unauthorized!' });
	}
};
