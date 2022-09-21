import {
  ClientPopulate,
  ClientStatus, ClientType, PhoneType, SortOrder,
  PhoneDefColumn, ContactDefColumn, ContactListPopulate, ClientSelectDefault,
} from './enums';

export interface ITimestamps {
  createdAt: Date,
  updatedAt: Date
}

export interface IClientPhone {
  number: string
}

export interface IClientBase extends ITimestamps {
  key: string,
  name: string,
  status: ClientStatus,
  type: ClientType

  email?: string,

  preferredProducts?: string[],

  company?: string,
  source?: string,
}

export interface IClientDetails extends IClientBase {
  manager: any
}

export interface IClientListItem extends IClientBase {
  phoneNumber: string,
  managerName: string,
}

export interface IPhonCreateInfo {
  type: PhoneType,
  number: string
}

export interface IPhone extends ITimestamps {
  key: string,
  type: PhoneType,
  number: string
}

export interface IAddress {
  floor?: string,
  suite?: string,
  building?: string,
  street: string,
  country: string,
  city: string,
  zoneCode: string,
  postalCode: string
}

export interface ILocation {
  longitude: number,
  latitude: number
}

export interface IClientModel extends Partial<IAddress>, Partial<ILocation>, ITimestamps {
  id: number,
  key: string,
  name: string,
  status: ClientStatus,
  type: ClientType

  email?: string,

  preferredProducts?: string[] | null,

  company?: string,
  source?: string,

  deleted: boolean,

  managerId: number
}

export interface IPhoneModel extends IPhone {
  id: number,
  clientId: number,
  clientContactId: number,
}

export interface IClientInfoQuery {
  include?: ClientPopulate[],
  select?: ClientSelectDefault[]
}

export interface IClientSearchOptions {
  filter?: IClientFilter,
  select?: ClientSelectDefault[],
  paginate?: IPaging,
  sort?: {
    sortBy: ClientSelectDefault;
    sortOrder: SortOrder;
  }[]
}

export interface IPaging {
  limit: number,
  offset?: number,
}

export interface IClientFilter {
  status?: ClientStatus[],
  type?: ClientType,

  name?: string,
  email?: string,

  managerName?: string,
  phoneNumber?: string,

  startDate?: Date,
  endDate?: Date
}

export interface IClientCreateInfo {
  name: string,
  type: ClientType,

  email?: string,
  phone?: Omit<IPhone, 'key'>

  preferredProducts?: string[],

  company?: string,
  source?: string,

  managerKey?: string
}

export interface IClientUpdateInfo {
  name?: string,
  email?: string,

  status?: ClientStatus,
  company?: Partial<string>,
  source?: string,
  type?: ClientType,

  preferredProducts?: string[],
  managerKey?: string
}

export interface IClientPhoneParams {
  clientKey: string,
  phoneKey: string
}

export interface IColsToJsonOpts {
  alias?: string,
  knexRaw?: boolean
}

export interface IPhoneSearchOptions {
  select?: PhoneDefColumn[],
  paginate?: IPaging,
  sort?: {
    sortBy: PhoneDefColumn;
    sortOrder: SortOrder;
  }[]
}

export interface ISearchResultPaging extends IPaging {
  count: number;
}

export interface ISearchResult<T> {
  data: T[],
  paging: ISearchResultPaging
}

export interface IContact extends ITimestamps {
  key: string,
  name: string,
  email: string,
  signingAuth: boolean,
}

export interface IContactModel extends IContact {
  id: number,
  clientId: number
}

export interface IContactCreateInfo {
  name: string,

  email: string,
  phone?: Omit<IPhone, 'key'>

  signingAuth: boolean
}

export interface IContactUpdateInfo {
  name?: string,
  email?: string,
  signingAuth?: boolean
}

export interface IClientContactParams {
  clientKey: string,
  contactKey: string
}

export interface IClientContactPhoneParams {
  clientKey: string,
  contactKey: string,
  phoneKey: string,
}

export interface IContactInfoOptions {
  select?: ContactDefColumn[]
}

export interface IContactSearchOptions {
  select?: (ContactDefColumn | ContactListPopulate)[],
  paginate?: IPaging,
  sort?: {
    sortBy: ContactDefColumn | ContactListPopulate;
    sortOrder: SortOrder;
  }[]
}
