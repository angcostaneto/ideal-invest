import { NextFunction, Request, Response } from 'express';
import { clienteRepository, ClienteRepository } from '@infra';
import { CreateClienteAdminException } from '@exceptions';

export class CreateClienteAdminCase {
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
			const result = await this.repository.create({
				...request.body,
				isAdmin: true // Set admins flag, for create admin cliente
			});
			return response.status(201).send(result);
		} catch (error: any) {
			next(new CreateClienteAdminException(error.message));
		}
	};
}

// Export instance to use in the main index
const createClienteAdminCase: CreateClienteAdminCase =
	new CreateClienteAdminCase(clienteRepository);

export { createClienteAdminCase };
