export interface CreateOrdemDto {
	valorCompra: number;
	qtdCompra: number;
	totalCompra: number;
	dataOrdem: Date;
	idProduto: number;
	idCliente: number;
}
