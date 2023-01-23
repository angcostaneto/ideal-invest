import { Request, Response } from 'express';
import { clienteRepository, ClienteRepository } from '@infra';
import { ValidationError } from 'sequelize';

export class CreateClienteCase {
	private repository: ClienteRepository;

	constructor(repository: ClienteRepository) {
		this.repository = repository;
	}

	execute = async (request: Request, response: Response) => {
		try {
			const result = await this.repository.create(request.body);
			return response.status(201).send(result);
		} catch (error: any) {
			return response.status(400).send({ status: 404, message: error.message });
		}
	};
}

// Export instance to use in the main index
const createClienteCase: CreateClienteCase = new CreateClienteCase(
	clienteRepository
);

export { createClienteCase };
