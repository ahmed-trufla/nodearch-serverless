import { Service } from '@nodearch/core';
import { v4 as uuidV4 } from 'uuid';


@Service()
export class UserService {

  async create(userInfo: any): Promise<string> {
    const clientKey = uuidV4();

    return clientKey;
  }

  async listUsers(options: any ) {

    return { data: [], paging: options };
  }

  geUser(userKey: string) {
    return { key: userKey, name: 'Test' };
  }

  async updateUser(userKey: string) {}

  async deleteUser(userKey: string) {}
}
