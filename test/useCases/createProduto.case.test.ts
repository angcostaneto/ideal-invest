import { CreateProdutoCase } from '@domain';
import { ProdutoRepository } from '@infra';
import * as httpMocks from 'node-mocks-http';
import { EventEmitter } from 'events';
import * as chai from 'chai';

const makeCreateOrdemCase = () => {
	const produtoRepository = new ProdutoRepository();
	const createProdutoCase = new CreateProdutoCase(produtoRepository);

	return {
		createProdutoCase,
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

describe('test create produto case', () => {
	describe('get ordem', () => {
		const { createProdutoCase, produtoRepository } = makeCreateOrdemCase();
		const { request, response } = makeHttp({
			url: '/cliente/admin/create'
		});

		beforeAll(async () => {
			jest.spyOn(produtoRepository, 'create').mockResolvedValueOnce({
				idProduto: 5,
				nome: 'Produto 5',
				ativo: true
			});

			await createProdutoCase.execute(request, response);
		});

		it('should get a ok status code', () => {
			chai.expect(response._getStatusCode()).equal(201);
		});

		it('should get correct value', () => {
			chai.expect(response._getData()).to.deep.equal({
				idProduto: 5,
				nome: 'Produto 5',
				ativo: true
			});
		});
	});
});
