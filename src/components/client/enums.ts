export enum PhoneType {
  home = 'home',
  cell = 'cell',
  work = 'work',
  other = 'other',
}

export enum ClientStatus {
  lead = 'lead',
  client = 'client',
  lost = 'lost',
  vip = 'vip',
}

export enum ClientDefColumn {
  key = 'key',
  name = 'name',
  type = 'type',
  email = 'email',
  status = 'status',
  company = 'company',
  source = 'source',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  preferredProducts = 'preferredProducts',
}

export enum ClientSelectDefault {
  key = 'key',
  name = 'name',
  type = 'type',
  email = 'email',
  status = 'status',
  company = 'company',
  source = 'source',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  preferredProducts = 'preferredProducts',
  managerName = 'managerName',
  phoneNumber = 'phoneNumber',
}

export enum ClientListPopulate {
  managerName = 'managerName',
  phoneNumber = 'phoneNumber',
}

export enum SortOrder {
  asc = 'asc',
  desc = 'desc',
}

export enum ClientPopulate {
  manager = 'manager',
}

export enum ClientPopulateColumn {
  managerKey = 'manager.key',
  managerName = 'manager.fullName',
}

export enum ClientType {
  individual = 'individual',
  organization = 'organization',
}

export enum PhoneDefColumn {
  key = 'key',
  type = 'type',
  number = 'number',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}

export enum ContactDefColumn {
  key = 'key',
  name = 'name',
  email = 'email',
  signingAuth = 'signingAuth',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}

export enum ContactListPopulate {
  phoneNumber = 'phoneNumber',
}
