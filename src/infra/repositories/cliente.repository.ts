import {
	Cliente,
	CreateClienteDto,
	ClienteDto,
	GetClienteByEmailDto
} from '@domain';
import { format } from 'date-fns';
import { ClienteLoginDto } from 'src/domain/dtos/clienteLogin.dto';

export class ClienteRepository {
	create = async (clienteData: CreateClienteDto): Promise<ClienteDto> => {
		const cliente = await Cliente.create(clienteData);

		return {
			nome: cliente.nome,
			cpf: cliente.cpf,
			dtNascimento: format(cliente.dtNascimento, 'dd/MM/yyyy'),
			email: cliente.email
		};
	};

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
