import {
	Table,
	Column,
	Model,
	BeforeSave,
	DataType,
	CreatedAt,
	UpdatedAt,
	DeletedAt,
	Default
} from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';
import { CreateClienteDto } from '../dtos';

@Table
export class Cliente extends Model<Cliente, CreateClienteDto> {
	@Column({
		primaryKey: true,
		autoIncrement: true,
		type: DataType.BIGINT
	})
	declare idCliente: number;

	@Column({
		type: DataType.STRING,
		allowNull: false
	})
	declare nome: string;

	@Column({
		type: DataType.STRING,
		allowNull: false
	})
	declare cpf: string;

	@Column({
		type: DataType.STRING,
		allowNull: false
	})
	declare password: string;

	@Column({
		type: DataType.DATE,
		allowNull: false
	})
	declare dtNascimento: Date;

	@Column({
		type: DataType.BOOLEAN,
		allowNull: false,
		defaultValue: true
	})
	declare ativo: boolean;

	@CreatedAt
	declare readonly createdAt: Date;

	@UpdatedAt
	declare readonly updatedAt: Date;

	@DeletedAt
	declare readonly deletedAt: Date;

	declare jwt: string;
	declare login: boolean;

	@BeforeSave
	static hashPassword = async (cliente: Cliente) => {
		return bcrypt
			.hash(cliente.password, 10)
			.then((hash) => {
				cliente.password = hash;
			})
			.catch((err) => {
				throw new Error();
			});
	};
}
