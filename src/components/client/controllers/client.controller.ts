import { Controller } from '@nodearch/core';
import {
  Middleware, Validation,
  HttpPath, HttpBody, OpenAPI,
  HttpPatch, HttpRes, express, HttpGet,
  HttpPost, HttpDelete, HttpQuery, HttpParams,
} from '@nodearch/express';
import {
  IClientCreateInfo, IClientInfoQuery, IClientSearchOptions, IClientUpdateInfo,
} from '../interfaces';
import {
  createClientValidation, deleteClientValidation, findClientValidation,
  searchClientValidation, updateClientValidation,
} from '../validation-schemas';
import { ClientService } from '../services/client.service';
import * as openApiInfo from '../openapi/client.openapi';

@OpenAPI(openApiInfo.ctrlDef)
@HttpPath('client-management')
@Controller()
export class ClientController {
  constructor(
    private clientService: ClientService,
  ) { }

  @OpenAPI(openApiInfo.createClient)
  @Validation(createClientValidation)
  @HttpPost('clients')
  async createClient(@HttpBody() clientInfo: IClientCreateInfo, @HttpRes() res: express.Response) {
    const key = await this.clientService.create(clientInfo);

    res.status(201).json({ data: { key } });
  }

  @OpenAPI(openApiInfo.listClient)
  @Validation(searchClientValidation)
  @HttpPost('client/search')
  async listClients(@HttpBody() searchOptions: IClientSearchOptions) {
    const clientList = await this.clientService.listClients(searchOptions);

    return clientList;
  }

  @OpenAPI(openApiInfo.getClient)
  @Validation(findClientValidation)
  @HttpGet('clients/:key')
  async getClient(@HttpParams('key') clientKey: string, @HttpQuery() findOptions: IClientInfoQuery) {
    const client = await this.clientService.getClient(clientKey, findOptions);

    return { data: client };
  }

  @OpenAPI(openApiInfo.updateClient)
  @Validation(updateClientValidation)
  @HttpPatch('clients/:key')
  async updateClient(@HttpParams('key') clientKey: string,
    @HttpBody() clientUpdateInfo: IClientUpdateInfo,
    @HttpRes() res: express.Response) {

    await this.clientService.updateClient(clientKey, clientUpdateInfo);

    res.status(204).end();
  }

  @OpenAPI(openApiInfo.deleteClient)
  @Validation(deleteClientValidation)
  @HttpDelete('clients/:key')
  async deleteClient(@HttpParams('key') clientKey: string, @HttpRes() res: express.Response) {
    await this.clientService.deleteClient(clientKey);

    res.status(204).end();
  }
}
