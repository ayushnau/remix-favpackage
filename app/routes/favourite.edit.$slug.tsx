import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import React, { useEffect } from "react";
import { json } from "@remix-run/node";
import { useActionData, useLoaderData, useSubmit } from "@remix-run/react";
import getPackageById from "~/services/packagesCrud/getPackageById";
import { Form } from "@remix-run/react";
import { useNavigate } from "@remix-run/react";
import updatePackage from "~/services/packagesCrud/updatePackage";
import ShowConfirmUpdateModal from "~/Components/Modals/ShowConfirmUpdateModal";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  console.log(params);
  const slug = params.slug;
  console.log({ slug });
  const response = await getPackageById({ slug });
  console.log(response);
  return json({ name: response.name, id: response.uuid });
};
const EditFavouritePackage = () => {
  const { name, id }: any = useLoaderData();
  const navigate = useNavigate();
  const submit = useSubmit();
  const state = useActionData();

  useEffect(() => {
    async () => {
      await ShowConfirmUpdateModal({});
    };
  }, [state]);
  return (
    <div className="relative">
      <button
        onClick={() => navigate("/favourite")}
        className="absolute -top-5 right-5 mb-4 w-fit text-end border ml-auto bg-blue-600 text-cyan-50  rounded-md  border-blue-600 px-3 py-2"
      >
        Favourites
      </button>
      <div className="">{name}</div>
      <Form
        method="post"
        encType="multipart/form-data"
        onSubmit={(event) => {
          submit(event.currentTarget);
        }}
        className="flex flex-col mt-4 gap-y-4"
      >
        <textarea
          name="description"
          className="h-[200px] px-5 py-5 rounded-md border border-black"
        />
        <input type="file" name="file" id="" />
        <button
          type="submit"
          className="px-4 py-2 mb-4 w-fit text-end border ml-auto bg-blue-600 text-cyan-50  rounded-md  border-blue-600"
        >
          Update
        </button>
      </Form>
    </div>
  );
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const uuid = params.slug;
  const formdata = await request.formData();

  console.log(formdata);
  console.log(uuid);
  try {
    const description = formdata.get("description");
    console.log(description);
    const response = await updatePackage({ uuid, description });
    return json({ success: 1 });
  } catch (e) {
    json({ success: 0 });
  }
  return json({ success: 1 });
};

export default EditFavouritePackage;
