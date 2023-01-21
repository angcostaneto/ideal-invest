import express from 'express';
import * as swaggerUi from 'swagger-ui-express';
// import * as swaggerJson from './swagger/swagger.json';
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/../.env' });
import {
	createClienteController,
	createOrdemController,
	sequelize
} from '@domain';
import { createProdutoController } from './domain/presentation/createProduto.controller';

export default class Api {
	private apiRoutes: express.Router;

	constructor() {
		this.apiRoutes = express.Router({ strict: false });
		createClienteController(this.apiRoutes);
		createOrdemController(this.apiRoutes);
		createProdutoController(this.apiRoutes);
	}

	startApplication() {
		const app = express();
		const port = process.env.PORT || 8888;
		sequelize.authenticate();
		sequelize.sync();

		app.use(express.json());

		app.use(
			'/docs',
			swaggerUi.serve
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			// swaggerUi.setup(swaggerJson)
		);

		app.use('/api', this.apiRoutes);
		app.listen(port);

		return app;
	}
}

const api = new Api();
api.startApplication();
