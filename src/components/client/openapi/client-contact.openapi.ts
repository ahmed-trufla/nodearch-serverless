import { IOpenAPIInfo } from '@nodearch/express';

export const clientContact = {
  type: 'object',
  properties: {
    key: { type: 'string', description: 'Client contact unique key (UUID v4).' },

    name: { type: 'string', description: 'Client contact full name.' },
    email: { type: 'string', description: 'Client contact email address.' },

    signingAuth: { type: 'boolean', description: 'A flag to detect whether contact have the authority to sign on behalf of the client or not.' },

    createdAt: { type: 'string', description: 'Client contact creation date.', example: Date.now().toString() },
    updatedAt: { type: 'string', description: 'Client contact updating date.', example: Date.now().toString() },
  },
};

export const updateClientContact: IOpenAPIInfo = {
  description: 'Update client contact.',
  security: [{ oauth2: ['client#update'] }],
  responses: {
    204: {
      description: 'Client contact is updated',
      content: {
        'application/json': {},
      },
    },
  },
};

export const deleteClientContact: IOpenAPIInfo = {
  description: 'Delete client contact.',
  security: [{ oauth2: ['client#update'] }],
  responses: {
    204: {
      description: 'Client contact is deleted',
      content: {
        'application/json': {},
      },
    },
  },
};

export const createClientContact: IOpenAPIInfo = {
  description: 'Create Client contact.',
  security: [{ oauth2: ['client#update'] }],
  responses: {
    201: {
      description: 'Client contact is created.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: {
                type: 'object',
                properties: {
                  key: { type: 'string', description: 'Client contact unique key (UUID v4).' },
                },
              },
            },
          },
        },
      },
    },
  },
};

export const getClientContact: IOpenAPIInfo = {
  description: 'Get Client contact info.',
  security: [{ oauth2: ['client#read'] }],
  responses: {
    200: {
      description: 'Client contact details object',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: clientContact,
            },
          },
        },
      },
    },
  },
};

export const listClientContact: IOpenAPIInfo = {
  description: 'Get list of client contacts.',
  security: [{ oauth2: ['client#read'] }],
  responses: {
    200: {
      description: 'Client contacts array of objects',
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
                description: 'A list of client contacts',
                items: {
                  type: 'object',
                  properties: {
                    ...clientContact.properties,
                    phoneNumber: { type: 'string' },
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

export const ctrlDef: IOpenAPIInfo = { tags: ['Client Management'], description: 'Client Contact management endpoints.' };
