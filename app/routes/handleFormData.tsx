import React from "react";
import { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import {
  unstable_composeUploadHandlers,
  unstable_parseMultipartFormData,
  unstable_createMemoryUploadHandler,
} from "@remix-run/node";
import { addPackage } from "~/services/packagesCrud/addPackage";

const handleFormData = () => {
  return <div>handleFormData</div>;
};

export async function action({ request }: ActionFunctionArgs) {
  let fileTitle = "";
  let fileContentType = "";
  let fileContents = "";
  const uploadHandler = unstable_composeUploadHandlers(
    async ({ name, data, filename, contentType, fileContent }: any) => {
      //   console.log(name, filename, contentType, data, "<<<<<<<<<<<");
      if (name == "fav_image") {
        fileTitle = filename;
        fileContentType = contentType;
        fileContents = await data.next();
      }
      return null;
    },
    unstable_createMemoryUploadHandler()
  );
  let formData = await unstable_parseMultipartFormData(request, uploadHandler);
  //   console.log({ fileContents }, fileTitle);

  const entries = Array.from(formData.entries()).map((value) => value);
  const packageName = entries[0][0];
  const packageDescription = formData.get("packageDescription");
  //   const fileContent = formData.get("fav_image");
  //   console.log({ newfilecontent });
  //   console.log(fileContent?.toString("base64"));
  const response = await addPackage({
    packageName,
    packageDescription,
    fileTitle,
    fileContent: fileContents,
    fileContentType,
  });
  return redirect("/add-favorite-package");
}

export default handleFormData;
