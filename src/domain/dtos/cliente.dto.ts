export interface ClienteDto {
	nome: string;
	cpf: string;
	dtNascimento: Date;
	email: string;
	ativo: Boolean;
	isAdmin?: Boolean;
}
