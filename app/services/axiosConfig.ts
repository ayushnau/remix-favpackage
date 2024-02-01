const axios = require("axios");

export let config = {
  method: "put",
  maxBodyLength: Infinity,
  url: "https://y1t8tnjoz5.execute-api.eu-north-1.amazonaws.com/dev/fav-package-image-storage/asyncapi.yml",
  headers: {
    "Content-Type": "text/yaml",
  },
};

axios
  .request(config)
  .then((response: any) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error: any) => {
    console.log(error);
  });
