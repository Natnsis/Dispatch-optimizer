import { rejects } from 'assert';
import { v2 as cloudinary } from 'cloudinary';
import { resolve } from 'path';
import streamifier from 'streamifier';

export const imageUploader = (bufferImage: Buffer): Promise<any> => {
  return new Promise((reject, resolve) => {
    const image = cloudinary.uploader.upload_stream(
      {
        folder: 'Traffic_Project',
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    streamifier.createReadStream(bufferImage).pipe(image);
  });
};
