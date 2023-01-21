import {
	Table,
	Column,
	Model,
	DataType,
	CreatedAt,
	UpdatedAt,
	DeletedAt
} from 'sequelize-typescript';
import { CreateProdutoDto } from '../dtos';

@Table
export class Produto extends Model<Produto, CreateProdutoDto> {
	@Column({
		primaryKey: true,
		autoIncrement: true,
		type: DataType.BIGINT
	})
	declare idProduto: number;

	@Column({
		type: DataType.STRING,
		allowNull: false
	})
	declare nome: string;

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
}
