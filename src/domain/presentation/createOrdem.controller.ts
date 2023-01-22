import { Router, Request, Response } from 'express';
import { createOrdemCase as handler } from '@domain';
import { verifyToken } from '@middleware';

export const createOrdemController = (router: Router) => {
	router.post(
		'/ordem/create',
		verifyToken,
		(request: Request, response: Response) => {
			handler.execute(request, response);
		}
	);
};
