import knex from "knex";
import knexfile from "../../../knexfile.mjs";
const knexInstance = knex(knexfile);

export const getFavPackageList = async () => {
  const data = await knexInstance("favourites_packages");
  return data;
};
