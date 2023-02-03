import { NextFunction, Request, Response } from 'express';
import {
	ordemRepository,
	OrdemRepository,
	produtoRepository,
	ProdutoRepository
} from '@infra';
import {
	OrdemException,
	OrdermNotFound,
	ProductNotFoundOrDeactivate
} from '@exceptions';

export class GetOrdemCase {
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
			const ordem = await this.ordemRepository.getById({
				idTransacao: Number(request.params['idTransacao']),
				idCliente: Number(response.locals.userId) // Get idCliente from token, this protect from user try to see ordems from another user
			});

			if (ordem) {
				const produto = await this.produtoRepository.getById({
					idProduto: ordem.idProduto
				});

				if (produto && produto.ativo) {
					const result = {
						idTransacao: ordem.idTransacao,
						valorCompra: ordem.valorCompra,
						qtdCompra: ordem.qtdCompra,
						totalCompra: ordem.totalCompra,
						dataOrdem: ordem.dataOrdem,
						produto: produto.nome
					};

					return response.status(200).send(result);
				}
				throw new ProductNotFoundOrDeactivate();
			}

			throw new OrdermNotFound();
		} catch (error: any) {
			next(new OrdemException(error.message));
		}
	};
}

// Export instance to use in the main index
const getOrdemCase: GetOrdemCase = new GetOrdemCase(
	ordemRepository,
	produtoRepository
);

export { getOrdemCase };
