import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import FavPackageList from "../Components/FavPackageList";
import { json } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import { useFetcher } from "@remix-run/react";
import { Outlet } from "@remix-run/react";

import { getFavPackageList } from "~/services/packagesCrud/getFavPackages";
import deletePackage from "~/services/packagesCrud/deletePackage";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {
  const packageList: any = await getFavPackageList();
  return json(packageList); //here call is being made.
};

export default function Favourites() {
  const params = useParams();
  console.log({ params });
  const packageList: any = useLoaderData();

  return (
    <div className=" h-[100vh] w-full px-[100px] py-[100px] relative">
      {params.slug ? <Outlet /> : <FavPackageList packageList={packageList} />}
    </div>
  );
}

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const formdata = await request.formData();
  const uuid = formdata.get("uuid");
  const response = await deletePackage({ uuid });
  return json({ success: response });
};
