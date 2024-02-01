import knex from "knex";
import knexfile from "../../knexfile.mjs";
import { v4 as uuid4 } from "uuid";
import { uploadImageToS3 } from "./uploadImageToS3";
// import { config } from "./axiosConfig";

const knexInstance = knex(knexfile);

export const addPackage = async ({ file }: any) => {
  await uploadImageToS3(file);

  try {
    // return knexInstance("fav_packages").insert([
    //   {
    //     uuid: uuid4(),
    //     name: packageName,
    //     description: packageDescription,
    //   },
    // ]);
  } catch (error) {
    return error;
  }
};
