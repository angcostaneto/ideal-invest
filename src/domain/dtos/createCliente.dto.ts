export interface CreateClienteDto {
	nome: string;
	cpf: string;
	email: string;
	password: string;
	dtNascimento: Date;
	isAdmin?: boolean;
}
