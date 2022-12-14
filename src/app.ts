/* eslint-disable @typescript-eslint/no-var-requires */
import { Namespace, createNamespace } from 'continuation-local-storage';
import cors from 'cors';
import express, {
  Application,
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from 'express';
import morgan from 'morgan-body';
import { userRouter } from './routes/user';
import { carRouter } from './routes/car';
import { rentRouter } from './routes/rent';
import { webHookRouter } from './routes/webhook';
import { globalErrorHandler } from './controllers/errorController';

import logger from '@middlewares/logger';

class App {
  public readonly app: Application;

  private readonly session: Namespace;

  constructor() {
    this.app = express();
    this.webhookRoute();
    this.app.use(express.json())
    this.session = createNamespace('request'); // é aqui que vamos armazenar o id da request
    this.middlewares();
    this.routes();
    this.errorHandle();
  }

  /**
   * Aqui nos configuramos os middlewares
   */
  private middlewares(): void {
    this.app.use(express.json());
    this.app.use(cors());
    const attachContext: RequestHandler = (
      _: Request,
      __: Response,
      next: NextFunction
    ) => {
      this.session.run(() => next());
    };

    const setRequestId: RequestHandler = (
      req: Request,
      _: Response,
      next: NextFunction
    ) => {
      this.session.set('id', req.id);
      next();
    };
    // Toda vez que chegar um request, nós armazenamos o id dela em um storage
    this.app.use(attachContext, setRequestId);
    morgan(this.app, {
      noColors: true,
      prettify: false,
      logReqUserAgent: false,
      stream: {
        write: (msg: string) => logger.info(msg) as any,
      },
    });
  }

  /**
   * Aqui é a configuração da lib para tratar os error
   */
  private errorHandle(): void {
    this.app.use(globalErrorHandler)

  }

  private routes(): void {
    this.app.use('/api/user', userRouter);
    this.app.use('/api/car', carRouter);
    this.app.use('/api/rent', rentRouter);
  }

  private webhookRoute(): void{
    this.app.use('/api/webhook', webHookRouter);
  }
}


export default new App();