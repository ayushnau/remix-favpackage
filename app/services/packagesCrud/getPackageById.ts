import knex from "knex";
import knexfile from "../../../knexfile.mjs";
import getImageFromS3 from "../AWS/getImageFromS3";
const knexInstance = knex(knexfile);

export default async ({ slug }: any) => {
  const data = await knexInstance("favourites_packages").where({ uuid: slug });

  //get the image.
  // data[image] = image.link

  console.log(data[0]);
  let file: any = {};
  file["path_to_file"] = data[0].filelocation;
  file["file_name"] = data[0].fileName;

  file = getImageFromS3(file);

  console.log({ ...data[0], url: file.url });
  return { ...data[0], url: file.url };
};
