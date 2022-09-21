import { IOpenAPIInfo } from '@nodearch/express';
import { ClientStatus, ClientType } from '../enums';

const baseClient = {
  key: { type: 'string', description: 'Client unique key (UUID v4).' },

  name: { type: 'string', description: 'Client full name.' },
  email: { type: 'string', description: 'Client email address.' },
  type: { type: 'string', description: 'Client type.', enum: Object.values(ClientType) },
  status: { type: 'string', description: 'Client status.', enum: Object.values(ClientStatus) },

  preferredProducts: { type: 'array', items: { type: 'string' } },

  company: { type: 'string', description: 'where the client is working at / own.' },
  source: { type: 'string', description: 'where this client had been received from.' },

  createdAt: { type: 'string', description: 'client creation date.', example: Date.now().toString() },
  updatedAt: { type: 'string', description: 'client updating date.', example: Date.now().toString() },
};

export const updateClient: IOpenAPIInfo = {
  description: 'Update Client.',
  security: [{ oauth2: ['client#update'] }],
  responses: {
    204: {
      description: 'Client is updated',
      content: {
        'application/json': {},
      },
    },
  },
};

export const deleteClient: IOpenAPIInfo = {
  description: 'Delete Client.',
  security: [{ oauth2: ['client#delete'] }],
  responses: {
    204: {
      description: 'Client is deleted',
      content: {
        'application/json': {},
      },
    },
  },
};

export const createClient: IOpenAPIInfo = {
  description: 'Create Client.',
  security: [{ oauth2: ['client#create'] }],
  responses: {
    201: {
      description: 'Client is created.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: {
                type: 'object',
                properties: {
                  key: { type: 'string', description: 'Client unique key (UUID v4).' },
                },
                required: ['key'],
              },
            },
          },
        },
      },
    },
  },
};

export const getClient: IOpenAPIInfo = {
  description: 'Get Client info.',
  security: [{ oauth2: ['client#read'] }],
  responses: {
    200: {
      description: 'Client details object',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: {
                type: 'object',
                properties: {
                  ...baseClient,

                  manager: {
                    type: 'object',
                    description: 'user who is acting as the account manager (Doesn\'t return by default it should be requested explicitly in the include qs).',
                    properties: {
                      key: { type: 'string', description: 'User unique key (UUID v4).' },
                      fullName: { type: 'string', description: 'User full name.' },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export const listClient: IOpenAPIInfo = {
  description: 'Get list of client info.',
  security: [{ oauth2: ['client#read'] }],
  responses: {
    200: {
      description: 'Clients details array of objects',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              paging: {
                type: 'object',
                properties: {
                  count: { type: 'number' },
                  limit: { type: 'number' },
                  offset: { type: 'number' },
                },
              },
              data: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    ...baseClient,
                    phoneNumber: {
                      type: 'string',
                      description: 'Client phone number (Doesn\'t return by default it should be requested explicitly in the select qs).',
                    },
                    managerName: {
                      type: 'string',
                      description: 'full name for user who is acting as the account manager (Doesn\'t return by default it should be requested explicitly in the select qs).',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export const ctrlDef: IOpenAPIInfo = { tags: ['Client Management'], description: 'Client management endpoints.' };
