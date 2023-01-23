import {
	Table,
	Column,
	Model,
	DataType,
	CreatedAt,
	UpdatedAt,
	DeletedAt,
	AllowNull,
	ForeignKey
} from 'sequelize-typescript';
import { CreateOrdemDto } from '../dtos';
import { Cliente } from './cliente.model';
import { Produto } from './produto.model';

@Table
export class Ordem extends Model<Ordem, CreateOrdemDto> {
	@Column({
		primaryKey: true,
		autoIncrement: true,
		type: DataType.BIGINT
	})
	declare idTransacao: number;

	@Column({
		type: DataType.DECIMAL,
		allowNull: false
	})
	declare valorCompra: number;

	@Column({
		type: DataType.INTEGER,
		allowNull: false
	})
	declare qtdCompra: number;

	@Column({
		type: DataType.DECIMAL,
		allowNull: false
	})
	declare totalCompra: number;

	@Column({
		type: DataType.DATEONLY,
		allowNull: false
	})
	declare dataOrdem: Date;

	@ForeignKey(() => Cliente)
	@AllowNull(false)
	@Column(DataType.BIGINT)
	declare idCliente: number;

	@ForeignKey(() => Produto)
	@AllowNull(false)
	@Column(DataType.BIGINT)
	declare idProduto: number;

	@CreatedAt
	declare readonly createdAt: Date;

	@UpdatedAt
	declare readonly updatedAt: Date;

	@DeletedAt
	declare readonly deletedAt: Date;
}
