import { Produto, CreateProdutoDto, ProdutoDto, GetProdutoDto } from '@domain';

export class ProdutoRepository {
	create = async (createProdutoDto: CreateProdutoDto): Promise<ProdutoDto> => {
		const produto = await Produto.create(createProdutoDto);

		return {
			idProduto: produto.idProduto,
			nome: produto.nome,
			ativo: produto.ativo
		};
	};

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
