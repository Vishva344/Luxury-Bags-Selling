import { FilesInterceptor } from '@nestjs/platform-express';
import { DeleteObjectCommand, DeleteObjectCommandOutput, S3Client } from '@aws-sdk/client-s3';
import { Request } from 'express';
import * as multerS3 from 'multer-s3';
import envConfig from '../../config/env.config';
import { BadRequestException } from '@nestjs/common';

/**
 * Add S3 details
 */
export const S3Config = new S3Client({
  region: envConfig.AWS_REGION,
  credentials: {
    accessKeyId: envConfig.AWS_ACCESS_KEY,
    secretAccessKey: envConfig.AWS_SECRET_KEY,
  },
});

/**
 * Common file upload interceptor
 */
export const FileUploadInterceptor = FilesInterceptor('bag_image', 10, {
  fileFilter: (
    req: Request,
    file: {
      fieldname: string;
      originalname: string;
      encoding: string;
      mimetype: string;
      size: number;
      destination: string;
      filename: string;
      path: string;
      buffer: Buffer;
    },
    cb: (error: Error | null, acceptFile: boolean) => void,
  ) => {
    const mimeTypes = ['image/jpeg', 'image/png', 'image/jpg', 'video/mp4', 'video/MOV', 'video/avi'];
    if (file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else if (mimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
  storage: multerS3({
    s3: S3Config,
    bucket: process.env.S3_BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: 'bag_image' });
    },
    key: function (req, file, cb) {
      cb(null, `file-${Date.now()}${Math.floor(Math.random() * (90 + 10))}-${file.originalname.replace(/\s/g, '')}`);
    },
  }),
});

export const FileDelete = async (keyValue: string): Promise<DeleteObjectCommandOutput> => {
  const command = new DeleteObjectCommand({ Bucket: envConfig.S3_BUCKET_NAME, Key: keyValue });
  try {
    const response = await S3Config.send(command);
    return response;
  } catch (err) {
    throw new BadRequestException(err);
  }
};
