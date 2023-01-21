import { Router, Request, Response } from 'express';
import { createProdutoCase as handler } from '@domain';

export const createProdutoController = (router: Router) => {
	router.post('/produto/create', (request: Request, response: Response) => {
		handler.execute(request, response);
	});
};
