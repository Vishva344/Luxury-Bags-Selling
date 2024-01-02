import { CommonResponse } from './common-response.type';

/**
 * @ignore
 */
export enum Role {
  SELLER = 'seller',
  BUYER = 'buyer',
  ADMIN = 'admin',
}

// export enum User {
//   SELLER = 'seller',
//   BUYER = 'buyer',
// }

export enum SortBy {
  ASE = 'asc',
  DEC = 'desc',
}

/**
 * @ignore
 */
export type CommonResponsePromise = Promise<CommonResponse>;

export interface CommonFile {
  bucket: string;
  key: string;
  acl: string;
  contentType: string;
  contentDisposition: null;
  storageClass: string;
  serverSideEncryption: null;
  metadata: object[];
  location: string;
  etag: string;
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  contentEncoding: null;
  versionId: undefined;
}

export enum MediaType {
  IMAGE = 'image',
  VIDEO = 'video',
}
