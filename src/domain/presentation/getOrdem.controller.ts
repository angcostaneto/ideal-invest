import { Router, Request, Response } from 'express';
import { getOrdemCase as handler } from '@domain';

export const getOrdemController = (router: Router) => {
	router.get('/ordem/:idTransacao', (request: Request, response: Response) => {
		handler.execute(request, response);
	});
};
