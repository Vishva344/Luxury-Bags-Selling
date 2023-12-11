import * as dotenv from 'dotenv';

/**
 * Get Environment Function
 * @returns Environment
 */
export const getEnvFile = (): string => `.env.${process.env.NODE_ENV}`;
dotenv.config({ path: getEnvFile() });

/**
 * Environments config variables
 */
export default {
  S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
  AWS_REGION: process.env.AWS_REGION,
  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
  AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
  S3PATH: process.env.S3PATH,
};
