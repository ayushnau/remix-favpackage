import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFetcher, useLoaderData } from "@remix-run/react";
import SearchList from "~/Components/SearchList";
import { json } from "@remix-run/react";
import { getPackageListFromApi } from "~/services/getPackageListFromApi";
import PackageList from "~/Components/FavPackageList";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

import { createCookie } from "@remix-run/node";

export const prefs = createCookie("prefs");

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await prefs.parse(cookieHeader)) || {};
  const response = await getPackageListFromApi(cookie.searchQuery);
  const packageListData = await response.json();
  console.log(packageListData);
  const packageList = packageListData.results;
  const searchQuery = cookie.searchQuery;
  return json({ packageList, searchQuery });
}

const Package = () => {
  const fetcher = useFetcher();
  let { searchQuery, packageList } = useLoaderData<typeof loader>();

  console.log({ searchQuery });

  console.log("checking where it runs >>");

  return (
    <div className=" rounded-xl w-full h-[100vh] px-[50px] py-[35px]">
      <SearchList packageList={packageList} />
    </div>
  );
};

export async function action({ request }: ActionFunctionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await prefs.parse(cookieHeader)) || {};
  const formData = await request.formData();
  console.log({ formData });

  const searchQuery = formData.get("searchQuery");
  cookie.searchQuery = searchQuery;

  return json(searchQuery, {
    headers: {
      "Set-Cookie": await prefs.serialize(cookie),
    },
  });
}

export default Package;
