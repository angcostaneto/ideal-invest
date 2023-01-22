import { Router, Request, Response } from 'express';
import { createProdutoCase as handler } from '@domain';
import { verifyIsAdmin, verifyToken } from '@middleware';

export const createProdutoController = (router: Router) => {
	router.post(
		'/produto/create',
		verifyIsAdmin,
		(request: Request, response: Response) => {
			handler.execute(request, response);
		}
	);
};
