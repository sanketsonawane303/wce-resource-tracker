import s3 from "../connections/s3.js";

const uploadImage = async (filename, blob) => {
  const image = await s3
    .upload({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: filename,
      Body: blob,
    })
    .promise();
  return image;
};

export default uploadImage;
