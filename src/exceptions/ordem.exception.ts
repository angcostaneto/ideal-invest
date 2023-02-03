import { HttpException } from './http.exception';

export class OrdemException extends HttpException {
	constructor(message: string) {
		super(404, `Error: ${message}`);
	}
}
