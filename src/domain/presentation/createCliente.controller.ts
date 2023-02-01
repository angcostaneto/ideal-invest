import { Router, Request, Response, NextFunction } from 'express';
import { createClienteCase as handler } from '@domain';

export const createClienteController = (router: Router) => {
	router.post(
		'/cliente/create',
		(request: Request, response: Response, next: NextFunction) => {
			handler.execute(request, response, next);
		}
	);
};
