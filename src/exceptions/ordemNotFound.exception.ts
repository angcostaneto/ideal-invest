import { HttpException } from './http.exception';

export class OrdermNotFound extends HttpException {
	constructor() {
		super(404, `Ordem not found`);
	}
}
