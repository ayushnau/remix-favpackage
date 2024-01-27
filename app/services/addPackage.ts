import knex from "knex";
import knexfile from "../../knexfile.mjs";
import { v4 as uuid4 } from "uuid";

console.log(knexfile);
const knexInstance = knex(knexfile);

export const addPackage = async ({ packageName, packageDescription }: any) => {
  return knexInstance("fav_packages").insert([
    {
      uuid: uuid4(),
      name: packageName,
      description: packageDescription,
    },
  ]);
};
