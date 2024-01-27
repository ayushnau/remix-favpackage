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
import { addPackage } from "~/services/addPackage";

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await userPrefs.parse(cookieHeader)) || {};

  const response = await getPackageListFromApi(cookie.searchQuery);
  const packageListData = await response.json();
  let packageList = packageListData.results;
  // const packageList: any[] = [];
  // await addPackage({
  //   packageName: "pacakagename",
  //   packageDescription: "description",
  // });

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
  console.log(formData.get("name"));

  const searchQuery = formData.get("searchQuery");
  if (searchQuery) cookie.searchQuery = searchQuery;
  else {
    //insert to db
    // const packageName = formData.get("packageName");
    const entries = Array.from(formData.entries()).map((value) => value);
    const packageName = entries[0][0];

    const packageDescription = formData.get("packageDescription");
    console.log(packageName, packageDescription);
    const response = await addPackage({ packageName, packageDescription });
    console.log({ response });
  }
  return redirect("/add-favorite-package", {
    headers: {
      "Set-Cookie": await userPrefs.serialize(cookie),
    },
  });
}

export default Package;
