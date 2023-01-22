import { JwtInterface, verifyJwt } from '@services';
import { Request, Response, NextFunction } from 'express';

export const verifyToken = async (
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

	try {
		const decoded = await verifyJwt(token.split(' ')[1]);

		const { id } = decoded as JwtInterface;
		response.locals.userId = id;

		return next();
	} catch (error) {
		return response.status(401).send({ message: 'Unauthorized' });
	}
};
