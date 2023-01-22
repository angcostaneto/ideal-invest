import { Ordem, CreateOrdemDto, OrdemDto, GetOrdemDto } from '@domain';
import { format } from 'date-fns';

export class OrdemRepository {
	create = async (ordemData: CreateOrdemDto): Promise<OrdemDto> => {
		const ordem = await Ordem.create(ordemData);

		return {
			idTransacao: ordem.idTransacao,
			valorCompra: ordem.valorCompra,
			qtdCompra: ordem.qtdCompra,
			totalCompra: ordem.totalCompra,
			dataOrdem: format(ordem.dataOrdem, 'dd/MM/yyyy'),
			idProduto: ordem.idProduto
		};
	};

	getById = async (ordermData: GetOrdemDto): Promise<OrdemDto> => {
		const ordem = await Ordem.findOne({
			where: {
				idTransacao: ordermData.idTransacao
			}
		});

		if (ordem) {
			return {
				idTransacao: ordem.idTransacao,
				valorCompra: ordem.valorCompra,
				qtdCompra: ordem.qtdCompra,
				totalCompra: ordem.totalCompra,
				dataOrdem: format(ordem.dataOrdem, 'dd/MM/yyyy'),
				idProduto: ordem.idProduto
			};
		}

		return {} as unknown as OrdemDto;
	};
}

export const ordemRepository: OrdemRepository = new OrdemRepository();
