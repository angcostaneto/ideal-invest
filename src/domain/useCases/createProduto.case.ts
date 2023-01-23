import { Request, Response } from 'express';
import { produtoRepository, ProdutoRepository } from '@infra';

export class CreateProdutoCase {
	private repository: ProdutoRepository;

	constructor(repository: ProdutoRepository) {
		this.repository = repository;
	}

	execute = async (request: Request, response: Response) => {
		try {
			const result = await this.repository.create(request.body);
			return response.status(201).send(result);
		} catch (error: any) {
			return response.status(404).send({ status: 404, message: error.message });
		}
	};
}

const createProdutoCase: CreateProdutoCase = new CreateProdutoCase(
	produtoRepository
);

export { createProdutoCase };
