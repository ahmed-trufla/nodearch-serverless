import { IOpenAPIInfo } from '@nodearch/express';

const baseUser = {
  key: { type: 'string', description: 'User unique key (UUID v4).' },

  name: { type: 'string', description: 'User full name.' },
  email: { type: 'string', description: 'User email address.' },
  type: { type: 'string', description: 'User type.' },
  status: { type: 'string', description: 'User status.' },

  preferredProducts: { type: 'array', items: { type: 'string' } },

  company: { type: 'string', description: 'where the User is working at / own.' },
  source: { type: 'string', description: 'where this User had been received from.' },

  createdAt: { type: 'string', description: 'User creation date.', example: Date.now().toString() },
  updatedAt: { type: 'string', description: 'User updating date.', example: Date.now().toString() },
};

export const updateUser: IOpenAPIInfo = {
  description: 'Update User.',
  security: [{ oauth2: ['User#update'] }],
  responses: {
    204: {
      description: 'User is updated',
      content: {
        'application/json': {},
      },
    },
  },
};

export const deleteUser: IOpenAPIInfo = {
  description: 'Delete User.',
  security: [{ oauth2: ['User#delete'] }],
  responses: {
    204: {
      description: 'User is deleted',
      content: {
        'application/json': {},
      },
    },
  },
};

export const createUser: IOpenAPIInfo = {
  description: 'Create User.',
  security: [{ oauth2: ['User#create'] }],
  responses: {
    201: {
      description: 'User is created.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: {
                type: 'object',
                properties: {
                  key: { type: 'string', description: 'User unique key (UUID v4).' },
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

export const getUser: IOpenAPIInfo = {
  description: 'Get User info.',
  security: [{ oauth2: ['User#read'] }],
  responses: {
    200: {
      description: 'User details object',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: {
                type: 'object',
                properties: {
                  ...baseUser,

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

export const listUser: IOpenAPIInfo = {
  description: 'Get list of User info.',
  security: [{ oauth2: ['User#read'] }],
  responses: {
    200: {
      description: 'Users details array of objects',
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
                    ...baseUser,
                    phoneNumber: {
                      type: 'string',
                      description: 'User phone number (Doesn\'t return by default it should be requested explicitly in the select qs).',
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

export const ctrlDef: IOpenAPIInfo = { tags: ['User Management'], description: 'User management endpoints.' };
