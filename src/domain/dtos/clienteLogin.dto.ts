export interface ClienteLoginDto {
	nome: string;
	password: string;
	cpf: string;
	dtNascimento: Date;
	email: string;
	ativo: Boolean;
	isAdmin?: Boolean;
	idCliente: number;
}
