import { Request, Response } from 'express';
import { ordemRepository, OrdermRepository } from '@infra';

export class CreateOrdemCase {
	private repository: OrdermRepository;

	constructor(repository: OrdermRepository) {
		this.repository = repository;
	}

	execute = async (request: Request, response: Response) => {
		try {
			const result = await this.repository.create(request.body);
			return response.status(201).send(result);
		} catch (error) {
			console.log(error);
		}
	};
}

const createOrdemCase: CreateOrdemCase = new CreateOrdemCase(ordemRepository);

export { createOrdemCase };
