import { HttpException } from './http.exception';

export class ProductNotFoundOrDeactivate extends HttpException {
	constructor() {
		super(404, `Product not found or deactivate`);
	}
}
