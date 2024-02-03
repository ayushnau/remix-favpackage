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
import { handleSaveAndUploadFile } from "~/services/handleSaveAndUploadFile";

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
      <input type="file" />
      <Form
        action="/add-favorite-package"
        method="post"
        className="flex items-center gap-3 w-full flex-col"
        encType="multipart/form-data"
      >
        <input type="file" name="fav_image" id="" />
        <button
          className="px-4 py-2 border border-black rounded-xl w-full"
          type="submit"
        >
          Enter
        </button>
      </Form>
      {/* <SearchList searchQuery={searchQuery} packageList={packageList} /> */}
    </div>
  );
};

export async function action({ request }: ActionFunctionArgs) {
  // const cookieHeader = request.headers.get("Cookie");
  // const cookie = (await userPrefs.parse(cookieHeader)) || {};

  const uploadHandler = unstable_composeUploadHandlers(
    unstable_createFileUploadHandler({
      maxPartSize: 5_000_000,
      file: ({ filename }: any) => filename,
    }),
    // parse everything else into memory
    unstable_createMemoryUploadHandler()
  );

  console.log("hi this is after upload handler");
  let formData = await unstable_parseMultipartFormData(request, uploadHandler);
  const fileSrc = formData.get("fav_image");
  console.log({ fileSrc });

  console.log("hi this is after upload handler");

  // const searchQuery = formData.get("searchQuery");
  // if (searchQuery) cookie.searchQuery = searchQuery;
  // else {

  //   const entries = Array.from(formData.entries()).map((value) => value);
  //   const packageName = entries[0][0];

  //   const fileSrc = formData.get("fav_image");

  //   const packageDescription = formData.get("packageDescription");

  //   const response = await addPackage({
  //     packageName,
  //     packageDescription,
  //     fileSrc,
  //   });
  //   console.log({ response });
  // }
  return redirect(
    "/add-favorite-package"
    // , {
    // headers: {
    //   "Set-Cookie": await userPrefs.serialize(cookie),
    // },
    // }
  );
}

export default Package;
