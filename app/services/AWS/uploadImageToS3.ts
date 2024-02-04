import axios from "axios";
import fs from "fs";
const AWS_BUCKET_NAME = "fav-package-image-storage";
const AWS_API = "https://y1t8tnjoz5.execute-api.eu-north-1.amazonaws.com/dev";

export const uploadImageToS3 = async ({
  fileTitle,
  fileContent,
  fileContentType,
}: any) => {
  if (!fileTitle || !fileContent || !fileContentType) {
    return "Cant upload ";
  }
  const url = `${AWS_API}/${AWS_BUCKET_NAME}/${fileTitle}`;
  let config = {
    method: "put",
    maxBodyLength: Infinity,
    url: url,
    headers: {
      "Content-Type": fileContentType,
    },
    data: fileContent,
  };
  const response = await axios.request(config);
  const data = response.data;
  console.log({ data });
  return data;
};
