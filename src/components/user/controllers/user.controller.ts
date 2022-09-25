import { Controller } from '@nodearch/core';
import {
  Validation,
  HttpPath, HttpBody, OpenAPI,
  HttpPatch, HttpRes, express, HttpGet,
  HttpPost, HttpDelete, HttpQuery, HttpParams,
} from '@nodearch/express';

import {
  createUserValidation, deleteUserValidation, findUserValidation,
  searchUserValidation, updateUserValidation,
} from '../validation-schemas';
import { UserService } from '../services/user.service';
import * as openApiInfo from '../openapi/user.openapi';

@OpenAPI(openApiInfo.ctrlDef)
@HttpPath('user-management')
@Controller()
export class UserController {
  constructor(
    private userService: UserService,
  ) { }

  @OpenAPI(openApiInfo.createUser)
  @Validation(createUserValidation)
  @HttpPost('users')
  async createUser(@HttpBody() userInfo: any, @HttpRes() res: express.Response) {
    const key = await this.userService.create(userInfo);

    res.status(201).json({ data: { key } });
  }

  @OpenAPI(openApiInfo.listUser)
  @Validation(searchUserValidation)
  @HttpPost('user/search')
  async listUsers(@HttpBody() searchOptions: any) {
    const userList = await this.userService.listUsers(searchOptions);

    return userList;
  }

  @OpenAPI(openApiInfo.getUser)
  @Validation(findUserValidation)
  @HttpGet('users/:key')
  async getUser(@HttpParams('key') userKey: string, @HttpQuery() findOptions: any) {
    const user = await this.userService.geUser(userKey);

    return { data: user };
  }

  @OpenAPI(openApiInfo.updateUser)
  @Validation(updateUserValidation)
  @HttpPatch('users/:key')
  async updateUser(@HttpParams('key') userKey: string,
    @HttpBody() userUpdateInfo: any,
    @HttpRes() res: express.Response) {

    await this.userService.updateUser(userKey);

    res.status(204).end();
  }

  @OpenAPI(openApiInfo.deleteUser)
  @Validation(deleteUserValidation)
  @HttpDelete('users/:key')
  async deleteUser(@HttpParams('key') userKey: string, @HttpRes() res: express.Response) {
    await this.userService.deleteUser(userKey);

    res.status(204).end();
  }
}
