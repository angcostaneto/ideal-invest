import {
	Cliente,
	CreateClienteDto,
	ClienteDto,
	GetClienteByEmailDto
} from '@domain';
import { format } from 'date-fns';
import { ClienteLoginDto } from 'src/domain/dtos/clienteLogin.dto';

export class ClienteRepository {
	/**
	 * Create cliente.
	 *
	 * @param clienteData CreateClienteDto
	 * @returns Promise<ClienteDto>
	 */
	create = async (clienteData: CreateClienteDto): Promise<ClienteDto> => {
		const cliente = await Cliente.create(clienteData);

		return {
			nome: cliente.nome,
			cpf: cliente.cpf,
			dtNascimento: format(
				new Date(`${cliente.dtNascimento} 00:00:00`),
				'dd/MM/yyyy'
			),
			email: cliente.email
		};
	};

	/**
	 *	Get cliente by email.
	 *
	 * @param clienteData GetClienteByEmailDto
	 * @returns Promise<ClienteLoginDto>
	 */
	geClienteByEmail = async (
		clienteData: GetClienteByEmailDto
	): Promise<ClienteLoginDto> => {
		const cliente = await Cliente.findOne({
			where: {
				email: clienteData.email
			}
		});

		if (cliente) {
			return {
				nome: cliente.nome,
				cpf: cliente.cpf,
				dtNascimento: cliente.dtNascimento,
				email: cliente.email,
				ativo: cliente.ativo,
				isAdmin: cliente.isAdmin,
				password: cliente.password,
				idCliente: cliente.idCliente
			};
		}

		return {} as unknown as ClienteLoginDto;
	};
}

export const clienteRepository: ClienteRepository = new ClienteRepository();
