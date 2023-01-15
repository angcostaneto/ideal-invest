import { Sequelize } from 'sequelize-typescript';

export const sequelize = new Sequelize({
	database: process.env['DATABASE'],
  dialect: 'mysql',
  username: process.env['DATABASE_USER'],
  password: process.env['DATABASE_PASSWORD'],
  storage: ':memory:',
  models: [__dirname + '/*.model.ts'],
	modelMatch: (filename, member) => {
  	return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
  },
})

export * from './cliente.model';
export * from './produto.model';
export * from './ordem.model';
