import {
	Table,
	Column,
	Model,
	HasOne
} from 'sequelize-typescript';
import { Cliente } from './cliente.model';
import { Produto } from './produto.model';


@Table
export class Ordem extends Model<Ordem> {

	@Column({ primaryKey: true, autoIncrement: true })
	declare idTransacao: number;

	@Column
	declare valorCompra: number;

	@Column
	declare qtdCompra: number;

	@Column
	declare totalCompra: number;

	@Column
	declare dataOrdem: Date;

	@HasOne(() => Cliente)
	declare idCliente: number;

	@HasOne(() => Produto)
	declare idProduto: number;

}
