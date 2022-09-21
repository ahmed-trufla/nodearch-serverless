import { AppStage } from '@nodearch/core';
import MainApp from './main';
import { restConfig } from './config';
import serverlessExpress from '@vendia/serverless-express';

let serverlessExpressInstance: any;

async function main() {
  const app = new MainApp();
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
