import { Request, Response } from 'express';
import { clienteRepository, ClienteRepository } from '@infra';

export class CreateClienteAdminCase {
	private repository: ClienteRepository;

	constructor(repository: ClienteRepository) {
		this.repository = repository;
	}

	execute = async (request: Request, response: Response) => {
		try {
			const result = await this.repository.create({
				...request.body,
				isAdmin: true // Set admins flag, for create admin cliente
			});
			return response.status(201).send(result);
		} catch (error: any) {
			return response.status(404).send({ status: 404, message: error.message });
		}
	};
}

// Export instance to use in the main index
const createClienteAdminCase: CreateClienteAdminCase =
	new CreateClienteAdminCase(clienteRepository);

export { createClienteAdminCase };
