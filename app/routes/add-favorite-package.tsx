import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFetcher, useLoaderData } from "@remix-run/react";
import SearchList from "~/Components/SearchList";
import { json } from "@remix-run/react";
import { getPackageListFromApi } from "~/services/getPackageListFromApi";
import PackageList from "~/Components/FavPackageList";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { userPrefs } from "~/cookie.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await userPrefs.parse(cookieHeader)) || {};

  const response = await getPackageListFromApi(cookie.searchQuery);
  const packageListData = await response.json();
  let packageList = packageListData.results;
  // const packageList: any[] = [];
  const searchQuery = cookie.searchQuery;
  return json(
    { packageList, searchQuery },
    {
      headers: {
        "Set-Cookie": await userPrefs.serialize(cookie),
      },
    }
  );
}

const Package = () => {
  const fetcher = useFetcher();
  let { searchQuery, packageList } = useLoaderData<typeof loader>();

  return (
    <div className=" rounded-xl w-full h-[100vh] px-[50px] py-[35px]">
      <SearchList searchQuery={searchQuery} packageList={packageList} />
    </div>
  );
};

export async function action({ request }: ActionFunctionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await userPrefs.parse(cookieHeader)) || {};
  const formData = await request.formData();

  console.log(formData);
  const searchQuery = formData.get("searchQuery");
  cookie.searchQuery = searchQuery;
  return redirect("/add-favorite-package", {
    headers: {
      "Set-Cookie": await userPrefs.serialize(cookie),
    },
  });
}

export default Package;
