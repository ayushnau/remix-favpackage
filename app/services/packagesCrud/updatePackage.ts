import knex from "knex";
import knexfile from "../../../knexfile.mjs";
import getImageFromS3 from "../AWS/getImageFromS3";
const knexInstance = knex(knexfile);

export default async ({ uuid, description }: any) => {
  const data = await knexInstance("favourites_packages")
    .where({ uuid })
    .update({ description });

  return { data };
};
