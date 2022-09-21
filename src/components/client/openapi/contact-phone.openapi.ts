import { IOpenAPIInfo } from '@nodearch/express';
import { PhoneType } from '../enums';

export const contactPhone = {
  type: 'object',
  properties: {
    key: { type: 'string', description: 'Client contact phone unique key (UUID v4).' },
    number: { type: 'string' },
    type: { type: 'string', enum: Object.values(PhoneType) },

    createdAt: { type: 'string', description: 'Client contact phone creation date.', example: Date.now().toString() },
    updatedAt: { type: 'string', description: 'Client contact phone updating date.', example: Date.now().toString() },
  },
};

export const updateContactPhone: IOpenAPIInfo = {
  description: 'Update client contact phone.',
  security: [{ oauth2: ['client#update'] }],
  responses: {
    204: {
      description: 'Client contact phone is updated',
      content: {
        'application/json': {},
      },
    },
  },
};

export const deleteContactPhone: IOpenAPIInfo = {
  description: 'Delete client contact phone.',
  security: [{ oauth2: ['client#update'] }],
  responses: {
    204: {
      description: 'Client contact Phone is deleted',
      content: {
        'application/json': {},
      },
    },
  },
};

export const createContactPhone: IOpenAPIInfo = {
  description: 'Create Client contact phone.',
  security: [{ oauth2: ['client#update'] }],
  responses: {
    201: {
      description: 'Client contact phone is created.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: {
                type: 'object',
                properties: {
                  key: { type: 'string', description: 'Client contact phone unique key (UUID v4).' },
                },
              },
            },
          },
        },
      },
    },
  },
};

export const getContactPhone: IOpenAPIInfo = {
  description: 'Get Client contact phone info.',
  security: [{ oauth2: ['client#read'] }],
  responses: {
    200: {
      description: 'Client contact phone details object',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: contactPhone,
            },
          },
        },
      },
    },
  },
};

export const listContactPhone: IOpenAPIInfo = {
  description: 'Get list of client contact phones.',
  security: [{ oauth2: ['client#read'] }],
  responses: {
    200: {
      description: 'Client contact phones array of objects',
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
                description: 'A list of client contact phones.',
                items: contactPhone,
              },
            },
          },
        },
      },
    },
  },
};

export const ctrlDef: IOpenAPIInfo = { tags: ['Client Management'], description: 'Client Contact Phone management endpoints.' };
