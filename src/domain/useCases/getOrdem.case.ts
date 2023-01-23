import { Request, Response } from 'express';
import {
	ordemRepository,
	OrdemRepository,
	produtoRepository,
	ProdutoRepository
} from '@infra';

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

	execute = async (request: Request, response: Response) => {
		try {
			const ordem = await this.ordemRepository.getById({
				idTransacao: Number(request.params['idTransacao'])
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
				return response
					.status(404)
					.send({ status: 404, message: 'Produto not found or inactive' });
			}

			return response
				.status(404)
				.send({ status: 404, message: 'Ordem not found' });
		} catch (error: any) {
			return response.status(404).send({ status: 404, message: error.message });
		}
	};
}

const getOrdemCase: GetOrdemCase = new GetOrdemCase(
	ordemRepository,
	produtoRepository
);

export { getOrdemCase };
