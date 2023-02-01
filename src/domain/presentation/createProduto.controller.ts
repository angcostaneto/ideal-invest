import { Router, Request, Response, NextFunction } from 'express';
import { createProdutoCase as handler } from '@domain';
import { verifyIsAdmin, verifyToken } from '@middleware';

export const createProdutoController = (router: Router) => {
	router.post(
		'/produto/create',
		verifyIsAdmin,
		(request: Request, response: Response, next: NextFunction) => {
			handler.execute(request, response, next);
		}
	);
};
