import {
	Table,
	Column,
	Model
} from 'sequelize-typescript';

@Table
export class Produto extends Model<Produto> {

	@Column({ primaryKey: true, autoIncrement: true })
	declare idProduto: number;

	@Column
	declare nome: string;

	@Column
	declare ativo: boolean;
}
