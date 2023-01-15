import { Cliente } from '@domain/models';
import { CreateClienteDto, ClienteDto } from '@domain/dtos';

export class ClienteRepository {

	async create(clienteData: CreateClienteDto): Promise<ClienteDto> {
		return await Cliente.create(clienteData)
	}

}
