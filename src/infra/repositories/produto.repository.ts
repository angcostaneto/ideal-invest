import { Produto, CreateProdutoDto, ProdutoDto } from '@domain';

export class ProdutoRepository {
	create = async (createProdutoDto: CreateProdutoDto): Promise<ProdutoDto> => {
		const produto = await Produto.create(createProdutoDto);

		return {
			idProduto: produto.idProduto,
			nome: produto.nome,
			ativo: produto.ativo
		} as ProdutoDto;
	};
}

export const produtoRepository: ProdutoRepository = new ProdutoRepository();
