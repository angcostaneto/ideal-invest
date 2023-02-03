import { HttpException } from './http.exception';

export class ProductDeactivate extends HttpException {
	constructor() {
		super(404, `Product Deactivate`);
	}
}
