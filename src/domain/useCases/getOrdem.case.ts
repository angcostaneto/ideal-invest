import { Request, Response } from 'express';
import { ordemRepository, OrdermRepository } from '@infra';

export class GetOrdemCase {
	private repository: OrdermRepository;

	constructor(repository: OrdermRepository) {
		this.repository = repository;
	}

	execute = async (request: Request, response: Response) => {
		try {
			const result = await this.repository.getById({
				idTransacao: Number(request.params['idTransacao'])
			});
			return response.status(201).send(result);
		} catch (error) {
			console.log(error);
		}
	};
}

const getOrdemCase: GetOrdemCase = new GetOrdemCase(ordemRepository);

export { getOrdemCase };
