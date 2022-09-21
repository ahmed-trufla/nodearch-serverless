import os from 'os';
import { join } from 'path';
import { ConfigManager } from '@nodearch/core';
import { IExpressServerOptions, InternalServerError } from '@nodearch/express';
import express from 'express';

const app: express.Application = express();

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, '..', '..', 'public')));

export const restConfig: IExpressServerOptions = {

  joiValidationOptions: {
    abortEarly: false,
    stripUnknown: true,
  },

  fileUploadOptions: {
    dest: join(os.tmpdir(), 'trumarket_temp_files'),
    limits: { fileSize: 15 * 1024 * 1024 },
  },

  expressApp: app,

  openAPIOptions: {
    jsonFilePath: join(__dirname, '..', '..', 'public/docs'),

    info: {
      title: ConfigManager.env({
        key: 'OPENAPI_INFO_TITLE',
        defaults: { all: 'truMarket API' },
      }),

      version: ConfigManager.env({
        key: 'OPENAPI_INFO_VERSION',
        defaults: { all: '3' },
      }),
    },

    enableAllRoutes: true,

    servers: [{
      url: ConfigManager.env({
        key: 'OPENAPI_SERVER',
        defaults: { all: 'http://localhost:6001' },
      }),
    }],

    security: {
      enableAllRoutes: true,

      securitySchemas: {
        oauth2: {
          type: 'oauth2',
          flows: {
            authorizationCode: {
              authorizationUrl: ConfigManager.env({
                key: 'OPENAPI_KEYCLOAK_AUTH_URL',
                defaults: {
                  all: 'http://localhost:6011/auth/realms/bestinsurance/protocol/openid-connect/auth',
                },
              }),
              tokenUrl: ConfigManager.env({
                key: 'OPENAPI_KEYCLOAK_TOKEN_URL',
                defaults: {
                  all: 'http://localhost:6011/auth/realms/bestinsurance/protocol/openid-connect/token',
                },
              }),
              scopes: {},
            },
            clientCredentials: {
              scopes: {},
              tokenUrl: ConfigManager.env({
                key: 'OPENAPI_KEYCLOAK_TOKEN_URL',
                defaults: {
                  all: 'http://localhost:6011/auth/realms/bestinsurance/protocol/openid-connect/token',
                },
              }),
            },
          },
        },
      },
    },
  },

  httpErrorsOptions: {
    customErrors: [{
      error: InternalServerError,
      handler: (error, res) => {
        // eslint-disable-next-line no-console
        console.error('[System Error] ', error);
        res.status(500).end();
      },
    }],
  },
};
