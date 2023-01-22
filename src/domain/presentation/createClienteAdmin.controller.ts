import { Router, Request, Response } from 'express';
import { createClienteAdminCase as handler } from '@domain';

export const createClienteAdminController = (router: Router) => {
	router.post(
		'/cliente/admin/create',
		(request: Request, response: Response) => {
			handler.execute(request, response);
		}
	);
};
