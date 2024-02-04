import AWS from "aws-sdk";
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: "ap-south-1",
});

const s3 = new AWS.S3();

export default (file: any) => {
  const myURL = new URL(file["path_to_file"]);

  console.log(file);
  let params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: myURL.pathname.slice(1),
    Expires: 600,
    ResponseContentDisposition: 'inline; filename ="' + file["file_name"] + '"',
  };

  const signedUrl = s3.getSignedUrl("getObject", params);

  console.log(signedUrl);
  file["url"] = signedUrl;

  return file;
};
