/* eslint-disable @typescript-eslint/naming-convention */
/**
 * Description - Add Development environment
 * @returns developmemt string
 */
export const _DEV_ = (): boolean => process.env.NODE_ENV === 'development';

/**
 * Description - Add Production environment
 * @returns production string
 */
export const _PROD_ = (): boolean => process.env.NODE_ENV === 'production';
