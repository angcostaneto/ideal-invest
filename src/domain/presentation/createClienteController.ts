import { Router, Request, Response } from 'express';
import { createClienteCase as handler } from '@domain';

export const createClienteController = (router: Router) => {
	router.post('/cliente/create', (request: Request, response: Response) => {
		handler.execute(request, response);
	});
};
