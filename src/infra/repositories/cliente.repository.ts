import { Cliente } from '@domain';
import { CreateClienteDto, ClienteDto } from '@domain';

export class ClienteRepository {
	async create(clienteData: CreateClienteDto): Promise<ClienteDto> {
		return await Cliente.create(clienteData);
	}
}
