import multer from 'multer';
import multers3 from 'multer-s3';
import aws from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import path from 'path';

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new aws.S3();

const uploadS3 = multer({
  storage: multers3({
    // @ts-ignore
    s3,
    bucket: 'e-simplify-images',
    acl: 'public-read',
    key: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${uuid()}${ext}`);
    },
    contentType: multers3.AUTO_CONTENT_TYPE,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
  }),
});

export const deleteS3 = (key: string): Promise<boolean> => {
  console.log('deleting image from s3', key);
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: 'e-simplify-images',
      Key: key,
    };

    s3.deleteObject(params, (err, data) => {
      if (err) {
        console.log('error deleting image from s3', err);
        reject(false);
      }
      console.log('image deleted from s3', data);
      resolve(true);
    });
  });
};

export default uploadS3;
