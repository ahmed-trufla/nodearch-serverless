import { IValidationSchema, Joi } from '@nodearch/express';
import {
  ClientPopulate, ClientListPopulate, ClientDefColumn,
  ClientStatus, ClientType, ClientPopulateColumn,
} from '../enums';

export const createClientValidation: IValidationSchema = {
  body: Joi.object({
    name: Joi.string()
      .pattern(/^[a-zA-Z0-9&?.%$'_\- ]+$/) // TODO: support all symbols in multi-language
      .trim()
      .min(1)
      .max(150)
      .required()
      .example('Kirsten D Childs'),

    type: Joi.string()
      .trim()
      .valid(...Object.values(ClientType))
      .required(),

    email: Joi.string()
      .trim()
      .email({ tlds: false })
      .max(320)
      .example('freeda.ku6@yahoo.com'),

    company: Joi.string()
      .trim()
      .min(1)
      .max(225),

    source: Joi.string()
      .trim()
      .min(1)
      .max(70),

    managerKey: Joi.string()
      .uuid({ version: 'uuidv4' }),

    preferredProducts: Joi.array().items(
      Joi.string()
        .trim()
        .min(1)
        .max(70),
    )
      .unique()
      .min(1),
  })
    .required(),
};

export const searchClientValidation: IValidationSchema = {
  body: Joi.object({
    select: Joi.array().items(
      Joi.string().valid(
        ...[...Object.values(ClientDefColumn), ...Object.values(ClientListPopulate)],
      ),
    )
      .unique()
      .min(1),

    filter: Joi.object().keys({
      type: Joi.string().valid(...Object.values(ClientType)),

      status: Joi.array().items(
        Joi.string().valid(...Object.values(ClientStatus)),
      ).min(1).max(10),

      startDate: Joi.date().iso(),
      endDate: Joi.date().iso().greater(Joi.ref('startDate')),

      name: Joi.string()
        .pattern(/^[a-zA-Z0-9&?.%$'_\- ]+$/)
        .trim()
        .min(1)
        .max(70)
        .description('filter by a part of client name'),

      phoneNumber: Joi.string()
        .pattern(/^[0-9]+$/) // TODO: move all patterns as joi extensions for phone, names,...etc to be shared for all Joi schemas
        .trim()
        .min(1)
        .max(15)
        .description('filter by a part of client phone number'),

      email: Joi.string()
        .email({ tlds: false })
        .min(1)
        .max(320)
        .description('filter by a part of client email'),

      managerName: Joi.string()
        .pattern(/^[a-zA-Z-' ]+$/)
        .trim()
        .min(1)
        .max(75)
        .description('filter by a part of client manager name'),
    })
      .or('type', 'status', 'startDate', 'endDate', 'name', 'email', 'managerName', 'phoneNumber'),

    paginate: Joi.object().keys({
      limit: Joi.number()
        .min(1)
        .max(100)
        .required()
        .description('Number of element to take.')
        .example(1),

      offset: Joi.number()
        .min(0)
        .description('Number of element to offset.')
        .example(0),
    }),

    sort: Joi.array().items(
      Joi.object().keys({
        sortBy: Joi.string().valid(
          ...[...Object.values(ClientDefColumn), ...Object.values(ClientListPopulate)],
        ).required(),
        sortOrder: Joi.string().required()
          .valid('asc', 'desc')
          .example('asc'),
      }),
    ).min(1)
      .max(10)
      .unique((current, next) => current.sortBy === next.sortBy),
  }),
};

export const findClientValidation: IValidationSchema = {
  params: Joi.object({
    key: Joi.string().uuid({ version: 'uuidv4' }).required(),
  })
    .required(),

  query: Joi.object({
    select: Joi.array().items(
      Joi.string().valid(...[
        ...Object.values(ClientDefColumn),
        ...Object.values(ClientPopulateColumn),
      ]),
    )
      .single()
      .unique()
      .min(1),

    include: Joi.array().items(
      Joi.string().valid(...Object.values(ClientPopulate)),
    )
      .single()
      .unique()
      .min(1),
  }),
};

export const deleteClientValidation: IValidationSchema = {
  params: Joi.object({
    key: Joi.string().uuid({ version: 'uuidv4' }).required(),
  })
    .required(),
};

export const updateClientValidation: IValidationSchema = {
  params: Joi.object({
    key: Joi.string().uuid({ version: 'uuidv4' }).required(),
  })
    .required(),

  body: Joi.object({
    managerKey: Joi.string()
      .uuid({ version: 'uuidv4' }),

    name: Joi.string()
      .pattern(/^[a-zA-Z0-9&?.%$'_\- ]+$/)
      .trim()
      .min(1)
      .max(150)
      .example('Kirsten D Childs'),

    email: Joi.string()
      .trim()
      .email({ tlds: false })
      .allow(null)
      .max(320)
      .example('freeda.ku6@yahoo.com'),

    status: Joi.string()
      .trim()
      .valid(...Object.values(ClientStatus))
      .example(ClientStatus.lead),

    preferredProducts: Joi.array().items(
      Joi.string()
        .trim()
        .min(1)
        .max(70),
    )
      .min(1)
      .allow(null),

    company: Joi.string()
      .trim()
      .min(1)
      .max(225)
      .allow(null),

    source: Joi.string()
      .trim()
      .min(1)
      .max(70)
      .allow(null),

    type: Joi.string()
      .trim()
      .valid(...Object.values(ClientType))
      .allow(null),
  })
    .or('name', 'email', 'status', 'preferredProducts', 'company', 'source', 'type', 'managerKey')
    .required(),
};
