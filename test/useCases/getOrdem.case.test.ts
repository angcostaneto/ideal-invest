import { GetOrdemCase } from '@domain';
import { OrdemRepository, ProdutoRepository } from '@infra';
import * as httpMocks from 'node-mocks-http';
import { EventEmitter } from 'events';
import * as chai from 'chai';

const makeCreateOrdemCase = () => {
	const ordemRepository = new OrdemRepository();
	const produtoRepository = new ProdutoRepository();
	const getOrdemCase = new GetOrdemCase(ordemRepository, produtoRepository);

	return {
		getOrdemCase,
		ordemRepository,
		produtoRepository
	};
};

const makeHttp = ({ url }: { url: string }) => {
	const request = httpMocks.createRequest({
		url
	});

	const response = httpMocks.createResponse({
		eventEmitter: EventEmitter
	});

	return {
		request,
		response
	};
};

describe('test get ordem case', () => {
	describe('get ordem', () => {
		const { getOrdemCase, ordemRepository, produtoRepository } =
			makeCreateOrdemCase();
		const { request, response } = makeHttp({
			url: '/cliente/admin/create'
		});

		beforeAll(async () => {
			jest.spyOn(produtoRepository, 'getById').mockResolvedValueOnce({
				idProduto: 5,
				nome: 'Produto 5',
				ativo: true
			});

			jest.spyOn(ordemRepository, 'getById').mockResolvedValue({
				idTransacao: 1,
				valorCompra: 20.3,
				qtdCompra: 3,
				totalCompra: 60.9,
				dataOrdem: '21/01/2023',
				idProduto: 5
			});
			await getOrdemCase.execute(request, response);
		});

		it('should get a ok status code', () => {
			chai.expect(response._getStatusCode()).equal(200);
		});

		it('should get correct value', () => {
			chai.expect(response._getData()).to.deep.equal({
				idTransacao: 1,
				valorCompra: 20.3,
				qtdCompra: 3,
				totalCompra: 60.9,
				dataOrdem: '21/01/2023',
				produto: 'Produto 5'
			});
		});
	});
});
