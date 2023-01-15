import {
	Table,
	Column,
	Model,
	BeforeSave,
	DataType
} from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';
import { CreateClienteDto } from '../dtos';

@Table
export class Cliente extends Model<Cliente, CreateClienteDto> {

	@Column({ primaryKey: true, autoIncrement: true })
	declare idCliente: number;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	declare nome: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	declare cpf: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	declare password: string;

	@Column({
		type: DataType.DATE,
		allowNull: false,
	})
	declare dtNascimento: Date;

	@Column({
		type: DataType.BOOLEAN,
		allowNull: false,
	})
	declare ativo: boolean;

	declare jwt: string;
  declare login: boolean;

	@BeforeSave
	async hashPassword(cliente: Cliente) {
		if (cliente.changed('password')) {
			let error, salt, hash;

			[error, salt] = await bcrypt.genSalt(10);
			if (error) {
				throw error;
			}

			[error, hash] = await bcrypt.hash(cliente.password, salt);
			if (error) {
				throw error;
			}

			cliente.password = hash;
		}
	}
}
