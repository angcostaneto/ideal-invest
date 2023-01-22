import { Router, Request, Response } from 'express';
import { logoutCase as handler } from '@domain';
import { verifyToken } from '@middleware';

export const logoutController = (router: Router) => {
	router.post(
		'/logout',
		verifyToken,
		(request: Request, response: Response) => {
			handler.execute(request, response);
		}
	);
};
