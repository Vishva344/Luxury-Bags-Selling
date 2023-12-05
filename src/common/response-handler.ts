import { CommonResponse } from './types/common-response.type';

/**
 * Description -Response Handler Utility Function
 */
export class ResponseHandler {
  /**
   * Description - Handler for Success Response
   * @param data
   * @param message
   * @param statusCode
   * @returns
   */
  public static success<T>(
    data: T,
    message: string | string[],
    statusCode: number,
  ): CommonResponse<T> {
    return {
      status: true,
      statusCode,
      message,
      data,
      error: [],
    };
  }

  /**
   * Description - Handler for Error Response
   * @param error
   * @param message
   * @param statusCode
   * @returns
   */
  static error<T>(
    error: T,
    message: string | string[],
    statusCode: number,
  ): CommonResponse<T> {
    return {
      status: false,
      statusCode,
      message,
      data: [],
      error,
    };
  }
}
