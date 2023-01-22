import {
	Table,
	Column,
	Model,
	BeforeSave,
	DataType,
	CreatedAt,
	UpdatedAt,
	DeletedAt
} from 'sequelize-typescript';
import { hash } from '@services';
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
	declare email: string;

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
		defaultValue: false
	})
	declare isAdmin: boolean;

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

	@BeforeSave
	static hashPassword = async (cliente: Cliente) => {
		cliente.password = await hash(cliente.password);

		return cliente.password;
	};
}
