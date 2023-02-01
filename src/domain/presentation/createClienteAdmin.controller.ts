import { Router, Request, Response, NextFunction } from 'express';
import { createClienteAdminCase as handler } from '@domain';

export const createClienteAdminController = (router: Router) => {
	router.post(
		'/cliente/admin/create',
		(request: Request, response: Response, next: NextFunction) => {
			handler.execute(request, response, next);
		}
	);
};
