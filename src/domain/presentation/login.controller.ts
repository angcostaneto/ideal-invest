import { Router, Request, Response } from 'express';
import { loginCase as handler } from '@domain';

export const loginController = (router: Router) => {
	router.post('/login', (request: Request, response: Response) => {
		handler.execute(request, response);
	});
};
