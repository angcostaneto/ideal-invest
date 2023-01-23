import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/../.env' }); // Enable .env in all project, DO NOT MOVE THIS DECLARATION
import {
	createClienteAdminController,
	createClienteController,
	createOrdemController,
	createProdutoController,
	getOrdemController,
	sequelize
} from '@domain';
import { loginController } from './domain/presentation/login.controller';
import { logoutController } from './domain/presentation/logout.controller';

export default class Api {
	private apiRoutes: express.Router;

	constructor() {
		this.apiRoutes = express.Router({ strict: false });

		/** Set apis routes **/
		createClienteController(this.apiRoutes);
		createClienteAdminController(this.apiRoutes);
		createOrdemController(this.apiRoutes);
		createProdutoController(this.apiRoutes);
		getOrdemController(this.apiRoutes);
		loginController(this.apiRoutes);
		logoutController(this.apiRoutes);
	}

	startApplication() {
		const app = express();
		const port = process.env.PORT || 8888;
		sequelize.authenticate();
		sequelize.sync();

		app.use(express.json());
		app.use('/api', this.apiRoutes);
		app.listen(port);

		return app;
	}
}

const api = new Api();
api.startApplication();
