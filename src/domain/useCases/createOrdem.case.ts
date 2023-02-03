import { NextFunction, Request, Response } from 'express';
import {
	ordemRepository,
	OrdemRepository,
	produtoRepository,
	ProdutoRepository
} from '@infra';
import { ProductDeactivate } from '@exceptions';

export class CreateOrdemCase {
	private ordemRepository: OrdemRepository;
	private produtoRepository: ProdutoRepository;

	constructor(
		ordemRepository: OrdemRepository,
		produtoRepository: ProdutoRepository
	) {
		this.ordemRepository = ordemRepository;
		this.produtoRepository = produtoRepository;
	}

	execute = async (
		request: Request,
		response: Response,
		next: NextFunction
	) => {
		try {
			const produto = await this.produtoRepository.getById(request.body);

			if (produto && produto.ativo) {
				const params = {
					...request.body,
					idCliente: response.locals.userId // Get user id from middleware, so is not necessary to pass by parameter
				};

				const result = await this.ordemRepository.create(params);
				return response.status(201).send(result);
			}

			throw new ProductDeactivate();
		} catch (error: any) {
			next(new ProductDeactivate());
		}
	};
}

// Export instance to use in the main index
const createOrdemCase: CreateOrdemCase = new CreateOrdemCase(
	ordemRepository,
	produtoRepository
);

export { createOrdemCase };
