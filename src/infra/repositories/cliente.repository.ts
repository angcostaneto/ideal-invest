import { Cliente, CreateClienteDto, ClienteDto } from '@domain';

export class ClienteRepository {
	create = async (clienteData: CreateClienteDto): Promise<ClienteDto> => {
		const cliente = await Cliente.create(clienteData);

		return {
			nome: cliente.nome,
			cpf: cliente.cpf,
			dtNascimento: cliente.dtNascimento,
			ativo: cliente.ativo
		} as ClienteDto;
	};
}

export const clienteRepository: ClienteRepository = new ClienteRepository();
