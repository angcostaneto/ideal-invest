import {
	Cliente,
	CreateClienteDto,
	ClienteDto,
	GetClienteByEmailDto
} from '@domain';
import { ClienteLoginDto } from 'src/domain/dtos/clienteLogin.dto';

export class ClienteRepository {
	create = async (clienteData: CreateClienteDto): Promise<ClienteDto> => {
		const cliente = await Cliente.create(clienteData);

		return {
			nome: cliente.nome,
			cpf: cliente.cpf,
			dtNascimento: cliente.dtNascimento,
			email: cliente.email,
			ativo: true
		} as ClienteDto;
	};

	createAdmin = async (clienteData: CreateClienteDto): Promise<ClienteDto> => {
		const cliente = await Cliente.create(clienteData);

		return {
			nome: cliente.nome,
			cpf: cliente.cpf,
			dtNascimento: cliente.dtNascimento,
			email: cliente.email,
			ativo: true,
			isAdmin: true
		} as ClienteDto;
	};

	geClienteByEmail = async (
		clienteData: GetClienteByEmailDto
	): Promise<ClienteLoginDto | undefined> => {
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

		return undefined;
	};
}

export const clienteRepository: ClienteRepository = new ClienteRepository();
