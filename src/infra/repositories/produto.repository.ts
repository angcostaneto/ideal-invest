import { Produto, CreateProdutoDto, ProdutoDto, GetProdutoDto } from '@domain';

export class ProdutoRepository {
	/**
	 * Create produto
	 *
	 * @param createProdutoDto CreateProdutoDto
	 * @returns Promise<ProdutoDto>
	 */
	create = async (createProdutoDto: CreateProdutoDto): Promise<ProdutoDto> => {
		const produto = await Produto.create(createProdutoDto);

		return {
			idProduto: produto.idProduto,
			nome: produto.nome,
			ativo: produto.ativo
		};
	};

	/**
	 * Get produto by id.
	 *
	 * @param produtoData GetProdutoDto
	 * @returns Promise<ProdutoDto>
	 */
	getById = async (produtoData: GetProdutoDto): Promise<ProdutoDto> => {
		const produto = await Produto.findOne({
			where: {
				idProduto: produtoData.idProduto
			}
		});

		if (produto) {
			return {
				idProduto: produto.idProduto,
				nome: produto.nome,
				ativo: produto.ativo
			};
		}

		return {} as unknown as ProdutoDto;
	};
}

export const produtoRepository: ProdutoRepository = new ProdutoRepository();
