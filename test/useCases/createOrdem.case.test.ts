import { CreateOrdemCase } from '@domain';
import { OrdemRepository, ProdutoRepository } from '@infra';
import * as httpMocks from 'node-mocks-http';
import { EventEmitter } from 'events';
import * as chai from 'chai';

const makeCreateOrdemCase = () => {
	const ordemRepository = new OrdemRepository();
	const produtoRepository = new ProdutoRepository();
	const createOrdemCase = new CreateOrdemCase(
		ordemRepository,
		produtoRepository
	);

	return {
		createOrdemCase,
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

describe('test create orderm case', () => {
	describe('create ordem', () => {
		const { createOrdemCase, ordemRepository, produtoRepository } =
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

			jest.spyOn(ordemRepository, 'create').mockResolvedValue({
				idTransacao: 1,
				valorCompra: 20.3,
				qtdCompra: 3,
				totalCompra: 60.9,
				dataOrdem: '21/01/2023',
				idProduto: 4
			});
			await createOrdemCase.execute(request, response);
		});

		it('should get a ok status code', () => {
			chai.expect(response._getStatusCode()).equal(201);
		});

		it('should get correct value', () => {
			chai.expect(response._getData()).to.deep.equal({
				idTransacao: 1,
				valorCompra: 20.3,
				qtdCompra: 3,
				totalCompra: 60.9,
				dataOrdem: '2023-01-21T00:00:00.000Z',
				idProduto: 4
			});
		});
	});

	describe('should get error message', () => {
		const { createOrdemCase, produtoRepository } = makeCreateOrdemCase();
		const { request, response } = makeHttp({
			url: '/cliente/admin/create'
		});

		beforeAll(async () => {
			jest.spyOn(produtoRepository, 'getById').mockResolvedValueOnce({
				idProduto: 5,
				nome: 'Produto 5',
				ativo: false
			});
			await createOrdemCase.execute(request, response);
		});

		it('should get a bad request status code', () => {
			chai.expect(response._getStatusCode()).equal(404);
		});

		it('should get a message', () => {
			chai.expect(response._getData()).to.deep.equal({
				message: 'Product desactivate!'
			});
		});
	});
});
