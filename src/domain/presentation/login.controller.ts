import { Router, Request, Response, NextFunction } from 'express';
import { loginCase as handler } from '@domain';

export const loginController = (router: Router) => {
	router.post(
		'/login',
		(request: Request, response: Response, next: NextFunction) => {
			handler.execute(request, response, next);
		}
	);
};
