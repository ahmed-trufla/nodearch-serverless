import { App, AppStage, ComponentScope, LogLevel } from '@nodearch/core';
import { restConfig } from '../config';
import serverlessExpress from '@vendia/serverless-express';
import {
  ExpressServer, ExpressHook, OpenAPICli,
} from '@nodearch/express';
import * as path from 'path';
import { ExpressService } from '@nodearch/express/dist/components/express.service';
let serverlessExpressInstance: any;

class ClientManagement extends App {
  constructor() {
    super({
      defaultScope: ComponentScope.Request,
      classLoader: {
        classpath: path.join(__dirname, '../components/client'),
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

async function main() {
  const app = new ClientManagement();
  await app.run(AppStage.Init);
}


async function setup(event: any, context: any) {
  await main();
  serverlessExpressInstance = serverlessExpress({ app: restConfig.expressApp });
  return serverlessExpressInstance(event, context);
}

function handler(event: any, context: any) {
  if (serverlessExpressInstance) return serverlessExpressInstance(event, context);

  return setup(event, context);
}

exports.handler = handler;
