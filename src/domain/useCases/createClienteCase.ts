import { Request, Response } from "express";
import { clienteRepository, ClienteRepository } from "@infra/repositories";

export class CreateClienteCase {
	private repository: ClienteRepository;

	constructor(
		repository: ClienteRepository
	) {
		this.repository = repository;
	}

	execute = async (request: Request, response: Response) => {
		try {
			const result = await this.repository.create(request.body);

			return response
				.status(201)
				.send(result)
		} catch (error) {
			throw error;
		}
	}
}

const createClienteCase: CreateClienteCase =
	new CreateClienteCase(clienteRepository);

export { createClienteCase };