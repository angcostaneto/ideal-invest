import { NextFunction, Request, Response } from 'express';
import { clienteRepository, ClienteRepository } from '@infra';
import { CreateClienteException } from '@exceptions';

export class CreateClienteCase {
	private repository: ClienteRepository;

	constructor(repository: ClienteRepository) {
		this.repository = repository;
	}

	execute = async (
		request: Request,
		response: Response,
		next: NextFunction
	) => {
		try {
			const result = await this.repository.create(request.body);
			return response.status(201).send(result);
		} catch (error: any) {
			next(new CreateClienteException(error.message));
		}
	};
}

// Export instance to use in the main index
const createClienteCase: CreateClienteCase = new CreateClienteCase(
	clienteRepository
);

export { createClienteCase };
