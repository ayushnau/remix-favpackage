import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: "ap-south-1",
});
const s3 = new AWS.S3({ region: "ap-south-1" });

console.log(process.env.AWS_BUCKET_NAME);
export const uploadImageToS3WithSDK = ({
  fileData,
  mimeType,
  fileName,
  hasPublicAccess = false,
}: any) => {
  // const bufferData = Buffer.from(fileData.value);
  // console.log(bufferData);
  let params = {
    Bucket: process.env.AWS_BUCKET_NAME ? process.env.AWS_BUCKET_NAME : "",
    Key: fileName,
    Body: fileData.value,
    ContentType: mimeType,
  };
  return s3
    .upload(params)
    .promise()
    .then((r) => {
      console.log(r);
      return { success: true, filelocation: r.Location };
    })
    .catch((error) => {
      console.log("error", error);
      throw new Error(
        JSON.stringify({
          message: error.message,
          code: error.code,
        })
      );
    });
};
