import { Router, Request, Response, NextFunction } from 'express';
import { logoutCase as handler } from '@domain';
import { verifyToken } from '@middleware';

export const logoutController = (router: Router) => {
	router.post(
		'/logout',
		verifyToken,
		(request: Request, response: Response, next: NextFunction) => {
			handler.execute(request, response, next);
		}
	);
};
