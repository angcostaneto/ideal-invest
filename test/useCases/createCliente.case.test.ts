import { CreateClienteCase } from '@domain';
import { ClienteRepository } from '@infra';
import * as httpMocks from 'node-mocks-http';
import { EventEmitter } from 'events';
import * as chai from 'chai';

const makeCreateClienteCase = () => {
	const repository = new ClienteRepository();
	const createClienteCase = new CreateClienteCase(repository);

	return {
		createClienteCase,
		repository
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

describe('test create cliente case', () => {
	describe('create cliente', () => {
		const { createClienteCase, repository } = makeCreateClienteCase();
		const { request, response } = makeHttp({
			url: '/cliente/create'
		});

		beforeAll(async () => {
			jest.spyOn(repository, 'create').mockResolvedValue({
				nome: 'Angelo Costa Neto',
				cpf: '05209505006',
				dtNascimento: '20/02/1994',
				email: 'angelo@example.com'
			});
			await createClienteCase.execute(request, response);
		});

		it('should get a ok status code', () => {
			chai.expect(response._getStatusCode()).equal(201);
		});

		it('should get correct value', () => {
			chai.expect(response._getData()).to.deep.equal({
				nome: 'Angelo Costa Neto',
				cpf: '05209505006',
				dtNascimento: '20/02/1994',
				email: 'angelo@example.com'
			});
		});
	});
});
