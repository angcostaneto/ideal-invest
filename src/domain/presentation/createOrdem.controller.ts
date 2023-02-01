import { Router, Request, Response, NextFunction } from 'express';
import { createOrdemCase as handler } from '@domain';
import { verifyToken } from '@middleware';

export const createOrdemController = (router: Router) => {
	router.post(
		'/ordem/create',
		verifyToken,
		(request: Request, response: Response, next: NextFunction) => {
			handler.execute(request, response, next);
		}
	);
};
