import { CommonResponse } from './common-response.type';

/**
 * @ignore
 */
export enum Role {
  ADMIN = 'admin',
  USER = 'user',
  SELLER = 'seller',
  BUYER = 'buyer',
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
  metadata: [object];
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
