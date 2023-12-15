// eslint-disable-next-line @typescript-eslint/naming-convention
import * as AWS from 'aws-sdk';
import envConfig from './env.config';

/**
 * Description - Default values
 */
export const Defaults = {
  SUPER_ADMIN_EMAIL: 'vishva@gmail.com',
  SUPER_ADMIN_PASSWORD: 'admin@123',
  PAGINATION_PAGE_SIZE: 1,
  PAGINATION_LIMIT: 10,
};

export const s3 = new AWS.S3({
  accessKeyId: envConfig.AWS_ACCESS_KEY,
  secretAccessKey: envConfig.AWS_SECRET_KEY,
});
