import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFetcher, useLoaderData } from "@remix-run/react";
import SearchList from "~/Components/SearchList";
import { json } from "@remix-run/react";
import { getPackageListFromApi } from "~/services/getPackageListFromApi";
import PackageList from "~/Components/FavPackageList";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

import { userPrefs } from "~/cookie.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await userPrefs.parse(cookieHeader)) || {};

  console.log(cookie , cookieHeader , "cookies in header")
  const response = await getPackageListFromApi(cookie.searchQuery);
  const packageListData = await response.json();
  const packageList = packageListData.results;
  const searchQuery = cookie.searchQuery;
  return json({ packageList, searchQuery }, {
    headers: {
      "Set-Cookie": await userPrefs.serialize(cookie),
    },
  });

}

const Package = () => {
  const fetcher = useFetcher();
  let { searchQuery, packageList } = useLoaderData<typeof loader>();

  console.log({searchQuery} , "in componnent")

  return (
    <div className=" rounded-xl w-full h-[100vh] px-[50px] py-[35px]">
      
      <form method="post" className="flex items-center gap-3">
        <input
          name="searchQuery"
          className="border border-black px-4 py-2 rounded-xl w-full font-extrabold"
          placeholder="Search the package here..."
        />
        <button type="submit">Search</button>
      </form>
      {/* <SearchList packageList={packageList} /> */}
        {searchQuery}     
    </div>
  );
};

export async function action({ request }: ActionFunctionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await userPrefs.parse(cookieHeader)) || {};
  const formData = await request.formData();


    console.log(cookie, formData)
  const searchQuery = formData.get("searchQuery");
  cookie.searchQuery = searchQuery;
  console.log(await userPrefs.serialize(cookie),"hi this the serailize in action")
  return json(searchQuery, {
    headers: {
      "Set-Cookie": await userPrefs.serialize(cookie),
    },
  });
}

export default Package;
