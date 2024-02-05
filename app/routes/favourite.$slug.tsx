import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import React from "react";
import { json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import getPackageById from "~/services/packagesCrud/getPackageById";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  console.log(params);
  const slug = params.slug ? params.slug : "";
  const response = await getPackageById({ slug });

  console.log(response);
  return json({ data: response });
};
const ViewFavouritePackage = () => {
  const { data }: any = useLoaderData();
  const navigate = useNavigate();
  console.log(data);
  return (
    <div className="relative">
      <div
        onClick={() => {
          navigate("/favourite");
        }}
        className="absolute top-0 right-10  mb-4 w-fit text-end border ml-auto bg-blue-600 text-cyan-50  rounded-md  border-blue-600 px-3 py-1 cursor-pointer"
      >
        Favourite
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="w-[40vh] h-[40v]">
          <img className="w-full h-full object-contain" src={data.url} alt="" />
        </div>
        <div className="mt-5">{data.name}</div>
        <div className="mt-5">{data.description}</div>
      </div>
    </div>
  );
};
export async function action({ request }: ActionFunctionArgs) {
  //get the uuid here.
}

export default ViewFavouritePackage;
