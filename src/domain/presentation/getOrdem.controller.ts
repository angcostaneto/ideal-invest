import { Router, Request, Response } from 'express';
import { getOrdemCase as handler } from '@domain';
import { verifyToken } from '@middleware';

export const getOrdemController = (router: Router) => {
	router.get(
		'/ordem/:idTransacao',
		verifyToken,
		(request: Request, response: Response) => {
			handler.execute(request, response);
		}
	);
};
