import { Ordem, CreateOrdemDto, OrdemDto } from '@domain';

export class OrdermRepository {
	create = async (ordemData: CreateOrdemDto): Promise<OrdemDto> => {
		const ordem = await Ordem.create(ordemData);

		return {
			idTransacao: ordem.idTransacao,
			valorCompra: ordem.valorCompra,
			qtdCompra: ordem.qtdCompra,
			totalCompra: ordem.totalCompra,
			dataOrdem: ordem.dataOrdem,
			idProduto: ordem.idProduto
		} as OrdemDto;
	};
}

export const ordemRepository: OrdermRepository = new OrdermRepository();
