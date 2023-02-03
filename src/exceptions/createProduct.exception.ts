import { HttpException } from './http.exception';

export class CreateProductException extends HttpException {
	constructor(message: string) {
		super(404, `Error: ${message}`);
	}
}
