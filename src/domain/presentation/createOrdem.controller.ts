import { Router, Request, Response } from 'express';
import { createOrdemCase as handler } from '@domain';

export const createOrdemController = (router: Router) => {
	router.post('/ordem/create', (request: Request, response: Response) => {
		handler.execute(request, response);
	});
};
