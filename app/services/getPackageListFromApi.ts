
import { json } from "@remix-run/node";


export const getPackageListFromApi = async(query:any) =>{
    const api = `https://api.npms.io/v2/search?q=${query}`;
    const response = await fetch(api)
    return response
  }
  