import * as dotenv from 'dotenv';

/**
 * Get Environment Function
 * @returns Environment
 */
export const getEnvFile = (): string => `.env.${process.env.NODE_ENV}`;
dotenv.config({ path: getEnvFile() });
