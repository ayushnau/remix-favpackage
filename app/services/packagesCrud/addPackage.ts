import knex from "knex";
import knexfile from "../../../knexfile.mjs";
import { v4 as uuid4 } from "uuid";
import { uploadImageToS3 } from "../AWS/uploadImageToS3";
import fs from "fs";
import { uploadImageToS3WithSDK } from "../AWS/uploadImageToS3WithSDK";
// import { config } from "./axiosConfig";

const knexInstance = knex(knexfile);

export const addPackage = async ({
  packageName,
  packageDescription,
  fileTitle,
  fileContent,
  fileContentType,
}: any) => {
  console.log({
    packageName,
    packageDescription,
    fileTitle,
    fileContent,
  });

  // const response = await uploadImageToS3({
  //   fileTitle,
  //   fileContent,
  //   fileContentType,
  // });x
  console.log("reached here");
  const response = await uploadImageToS3WithSDK({
    fileData: fileContent,
    mimeType: fileContentType,
    fileName: fileTitle,
  });

  if (response.success)
    try {
      return knexInstance("favourites_packages").insert([
        {
          uuid: uuid4(),
          name: packageName,
          description: packageDescription,
          filelocation: response.filelocation,
          fileName: fileTitle,
        },
      ]);
    } catch (error) {
      return error;
    }
};
