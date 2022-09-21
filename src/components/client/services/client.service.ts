import { Service } from '@nodearch/core';
import { v4 as uuidV4 } from 'uuid';
import {
  IClientCreateInfo, IClientDetails, IClientInfoQuery,
  IClientListItem,
  IClientSearchOptions, IClientUpdateInfo, ISearchResult,
} from '../interfaces';

@Service()
export class ClientService {

  async create(clientInfo: IClientCreateInfo): Promise<string> {
    const clientKey = uuidV4();

    return clientKey;
  }

  async listClients(options: IClientSearchOptions ) {

    return { data: [], paging: options };
  }

  getClient(clientKey: string, options: IClientInfoQuery){
    return { key: clientKey, name: 'Test' };
  }

  async updateClient(clientKey: string, clientInfo: IClientUpdateInfo) {}

  async deleteClient(clientKey: string) {}
}
