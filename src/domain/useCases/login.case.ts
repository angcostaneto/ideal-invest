import { Request, Response } from 'express';
import { clienteRepository, ClienteRepository } from '@infra';
import { compare, createToken, JwtInterface } from '@services';

export class LoginCase {
	private repository: ClienteRepository;

	constructor(repository: ClienteRepository) {
		this.repository = repository;
	}

	execute = async (request: Request, response: Response) => {
		try {
			const cliente = await this.repository.geClienteByEmail(request.body);

			if (cliente && cliente.password && cliente.ativo) {
				const isMatched = await compare(
					request.body.password,
					cliente.password
				);

				if (isMatched) {
					const token = await createToken({
						id: cliente.idCliente,
						isAdmin: cliente.isAdmin
					} as JwtInterface);

					return response.status(200).send({
						access_token: token,
						token_type: 'Bearer'
					});
				}

				return response
					.status(401)
					.send({ status: 401, message: 'Invallid credentials' });
			}

			return response
				.status(401)
				.send({ status: 401, message: 'Invallid credentials' });
		} catch (error) {
			return response
				.status(401)
				.send({ status: 401, message: 'Invallid credentials' });
		}
	};
}

// Export instance to use in the main index
const loginCase: LoginCase = new LoginCase(clienteRepository);

export { loginCase };
