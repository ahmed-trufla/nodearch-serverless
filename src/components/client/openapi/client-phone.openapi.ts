import { IOpenAPIInfo } from '@nodearch/express';
import { PhoneType } from '../enums';

export const clientPhone = {
  type: 'object',
  properties: {
    key: { type: 'string', description: 'Client phone unique key (UUID v4).' },
    number: { type: 'string' },
    type: { type: 'string', enum: Object.values(PhoneType) },

    createdAt: { type: 'string', description: 'Client phone creation date.', example: Date.now().toString() },
    updatedAt: { type: 'string', description: 'Client phone updating date.', example: Date.now().toString() },
  },
};

export const updateClientPhone: IOpenAPIInfo = {
  description: 'Update client phone.',
  security: [{ oauth2: ['client#update'] }],
  responses: {
    204: {
      description: 'Client phone is updated',
      content: {
        'application/json': {},
      },
    },
  },
};

export const deleteClientPhone: IOpenAPIInfo = {
  description: 'Delete client phone.',
  security: [{ oauth2: ['client#update'] }],
  responses: {
    204: {
      description: 'Client Phone is deleted',
      content: {
        'application/json': {},
      },
    },
  },
};

export const createClientPhone: IOpenAPIInfo = {
  description: 'Create Client phone.',
  security: [{ oauth2: ['client#update'] }],
  responses: {
    201: {
      description: 'Client phone is created.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: {
                type: 'object',
                properties: {
                  key: { type: 'string', description: 'Client phone unique key (UUID v4).' },
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

export const getClientPhone: IOpenAPIInfo = {
  description: 'Get Client phone info.',
  security: [{ oauth2: ['client#read'] }],
  responses: {
    200: {
      description: 'Client phone details object',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: clientPhone,
            },
          },
        },
      },
    },
  },
};

export const listClientPhone: IOpenAPIInfo = {
  description: 'Get list of client phones.',
  security: [{ oauth2: ['client#read'] }],
  responses: {
    200: {
      description: 'Client phones array of objects',
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
                description: 'A list of client phones (Doesn\'t return by default it should be requested explicitly in the include qs).',
                items: clientPhone,
              },
            },
          },
        },
      },
    },
  },
};

export const ctrlDef: IOpenAPIInfo = { tags: ['Client Management'], description: 'Client Phone management endpoints.' };
