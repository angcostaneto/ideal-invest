import express from 'express';
import * as swaggerUi from 'swagger-ui-express';
// import * as swaggerJson from './swagger/swagger.json';

import { createClienteController } from '@domain/presentation';

export default class Api {
  private apiRoutes: express.Router;

	constructor() {
		this.apiRoutes = express.Router({ strict: false });
		createClienteController(this.apiRoutes);
	}

	startApplication() {
		const app = express();
		const port = process.env.PORT || 8888;

		app.use(express.json());

		app.use(
      '/docs',
      swaggerUi.serve,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      // swaggerUi.setup(swaggerJson)
    );

		app.listen(port);

		return app;
	}
}

const api = new Api();
api.startApplication();
