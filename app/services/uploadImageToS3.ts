import axios from "axios";
const AWS_BUCKET_NAME = "fav-package-image-storage";
const AWS_API = "https://y1t8tnjoz5.execute-api.eu-north-1.amazonaws.com/dev"

export const uploadImageToS3 = async (file: any) => {
  console.log(file);
  console.log(file.type);
  const url = `${AWS_API}/${AWS_BUCKET_NAME}/${file}`;
  let config = {
    method: "put",
    maxBodyLength: Infinity,
    url: url,
    headers: {
      "Content-Type": "image/png",
    },
    data: file,
  };
  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
  return null;
};
