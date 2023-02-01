import { NextFunction, Request, Response } from 'express';
import { produtoRepository, ProdutoRepository } from '@infra';
import { CreateProductException } from '@exceptions';

export class CreateProdutoCase {
	private repository: ProdutoRepository;

	constructor(repository: ProdutoRepository) {
		this.repository = repository;
	}

	execute = async (
		request: Request,
		response: Response,
		next: NextFunction
	) => {
		try {
			const result = await this.repository.create(request.body);
			return response.status(201).send(result);
		} catch (error: any) {
			next(new CreateProductException(error.message));
		}
	};
}

// Export instance to use in the main index
const createProdutoCase: CreateProdutoCase = new CreateProdutoCase(
	produtoRepository
);

export { createProdutoCase };
