import { Request, Response } from 'express';
import {
	ordemRepository,
	OrdemRepository,
	produtoRepository,
	ProdutoRepository
} from '@infra';

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

	execute = async (request: Request, response: Response) => {
		try {
			const produto = await this.produtoRepository.getById(request.body);

			if (produto && produto.ativo) {
				const params = {
					...request.body,
					idCliente: response.locals.userId
				};

				const result = await this.ordemRepository.create(params);
				return response.status(201).send(result);
			}

			return response.status(404).send({ message: 'Product desactivate!' });
		} catch (error: any) {
			return response.status(404).send({ status: 404, message: error.message });
		}
	};
}

const createOrdemCase: CreateOrdemCase = new CreateOrdemCase(
	ordemRepository,
	produtoRepository
);

export { createOrdemCase };
