import { HttpException } from './http.exception';

export class CreateClienteException extends HttpException {
	constructor(message: string) {
		super(404, `Error: ${message}`);
	}
}
