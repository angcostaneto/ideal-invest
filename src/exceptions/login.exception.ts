import { HttpException } from './http.exception';

export class LoginException extends HttpException {
	constructor() {
		super(404, `Fail to make login`);
	}
}
