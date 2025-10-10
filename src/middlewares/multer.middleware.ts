import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

export const imageUploader = (bufferImage: Buffer): Promise<any> => {
  return new Promise((resolve, reject) => {
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
