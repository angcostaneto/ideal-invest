import { NextFunction, Request, Response } from 'express';
import { clienteRepository, ClienteRepository } from '@infra';
import { compare, createToken, JwtInterface } from '@services';
import { LoginException } from '@exceptions';

export class LoginCase {
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

				throw new LoginException();
			}

			throw new LoginException();
		} catch (error) {
			next(new LoginException());
		}
	};
}

// Export instance to use in the main index
const loginCase: LoginCase = new LoginCase(clienteRepository);

export { loginCase };
