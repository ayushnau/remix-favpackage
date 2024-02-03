import React, { useEffect, useState } from "react";

import { json } from "@remix-run/react";

import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

import { Form } from "@remix-run/react";
import {
  unstable_composeUploadHandlers,
  unstable_createFileUploadHandler,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
  return json({ success: true });
}

const Package = () => {
  return (
    <div className=" rounded-xl w-full h-[100vh] px-[50px] py-[35px]">
      <Form
        encType="multipart/form-data"
        method="post"
        className="flex items-center gap-3 w-full flex-col"
      >
        <input type="file" name="fav_image" id="" />
        <input type="text" />
        <button
          className="px-4 py-2 border border-black rounded-xl w-full"
          type="submit"
        >
          Enter
        </button>
      </Form>
    </div>
  );
};

export async function action({ request }: ActionFunctionArgs) {
  console.log("action for the add favorite package.");
  const uploadHandler = unstable_composeUploadHandlers(
    unstable_createFileUploadHandler({
      maxPartSize: 5_000_000,
      directory: "/Users/betalectic/desktop",
      file: ({ filename }: any) => filename,
    }),
    // parse everything else into memory
    unstable_createMemoryUploadHandler()
  );
  console.log(request.body);
  let formData = await unstable_parseMultipartFormData(request, uploadHandler);
  const fileSrc = formData.get("fav_image");
  console.log({ fileSrc });
  return json({ success: true });
}

export default Package;
