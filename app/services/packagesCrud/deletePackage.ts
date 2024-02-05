import knex from "knex";
import knexfile from "../../../knexfile.mjs";
import getImageFromS3 from "../AWS/getImageFromS3";
const knexInstance = knex(knexfile);

export default async ({ uuid }: any) => {
  console.log(uuid);
  const data = await knexInstance("favourites_packages")
    .where({ uuid })
    .delete();
  return { data };
};
