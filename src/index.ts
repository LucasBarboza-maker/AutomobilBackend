import { server } from '@config/index';
import connect from '@config/db'
import express from './app';
import logger from '@middlewares/logger';

connect.then(() => logger.info(`Connection established`));

express.app.listen(server.PORT, () => {
  logger.info('Server running', { port: server.PORT, mode: server.ENV });
});