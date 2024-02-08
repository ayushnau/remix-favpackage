import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import SearchList from "~/Components/SearchList";
import { json } from "@remix-run/react";
import { getPackageListFromApi } from "~/services/Search/getPackageListFromApi";
import PackageList from "~/Components/FavPackageList";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { userPrefs } from "~/cookie.server";
import { addPackage } from "~/services/packagesCrud/addPackage";
import { v4 as uuid4 } from "uuid";
import { useSubmit } from "@remix-run/react";
import { Form } from "@remix-run/react";
import {
  unstable_composeUploadHandlers,
  unstable_createFileUploadHandler,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import { UploadHandler } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await userPrefs.parse(cookieHeader)) || {};

  const response = await getPackageListFromApi(cookie.searchQuery);
  console.log(response);
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
  const navigate = useNavigate();

  return (
    <div className=" rounded-md w-full h-[100vh] px-[50px] py-[70px] relative flex flex-col ">
      <button
        onClick={() => navigate("/favourite")}
        className="px-4 py-2 mb-4 w-fit text-end border ml-auto bg-blue-600 text-cyan-50  rounded-md  border-blue-600"
      >
        Favourites
      </button>
      <SearchList searchQuery={searchQuery} packageList={packageList} />
    </div>
  );
};

export async function action({ request }: ActionFunctionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await userPrefs.parse(cookieHeader)) || {};

  let formData = await request.formData();
  const searchQuery = formData.get("searchQuery");

  cookie.searchQuery = searchQuery;

  return redirect("/add-favorite-package", {
    headers: {
      "Set-Cookie": await userPrefs.serialize(cookie),
    },
  });
}

export default Package;
