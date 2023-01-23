import { Request, Response } from 'express';
import { cacheSet } from '@services';
import { addMonths } from 'date-fns';

export class LogoutCase {
	constructor() {}

	execute = async (request: Request, response: Response) => {
		try {
			const token = request.headers.authorization as string;
			const now = new Date();
			const milliseconds = Math.floor(addMonths(now, 1).getTime() / 1000);

			await cacheSet(token, token, milliseconds);
			return response.status(200).send({
				message: 'Logged out successfully'
			});
		} catch (error) {
			return response
				.status(401)
				.send({ status: 401, message: 'Something Wrong!' });
		}
	};
}

const logoutCase: LogoutCase = new LogoutCase();

export { logoutCase };
