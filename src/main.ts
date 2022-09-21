import { App, ComponentScope, LogLevel } from '@nodearch/core';
import {
  ExpressServer, ExpressHook, OpenAPICli,
} from '@nodearch/express';
import * as path from 'path';
import { ExpressService } from '@nodearch/express/dist/components/express.service';
import { restConfig } from './config';


export default class TruMarket extends App {
  constructor() {
    super({
      defaultScope: ComponentScope.Request,
      classLoader: {
        classpath: path.join(__dirname, 'components'),
      },
      logging: {
        logLevel: LogLevel.Debug,
      },
      extensions: [
        { app: new ExpressServer(restConfig), include: [ExpressHook, ExpressService, OpenAPICli] },
      ],
    });
  }
}
