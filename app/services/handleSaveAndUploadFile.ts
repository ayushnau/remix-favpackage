import {
  unstable_composeUploadHandlers as composeUploadHandlers,
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  unstable_parseMultipartFormData as parseMultipartFormData,
} from "@remix-run/node";
import { UploadHandler } from "@remix-run/node";
import { uploadImageToS3 } from "./uploadImageToS3";

export const handleSaveAndUploadFile = async (request: any, formData: any) => {
  console.log(request, formData);
  const uploadHandler: UploadHandler = composeUploadHandlers(
    async ({ name, data }) => {
      console.log(typeof data, data, name);
      return name;
    },
    createMemoryUploadHandler()
  );
  console.log(formData);
  formData = await parseMultipartFormData(request, uploadHandler);
  console.log(formData);
};
