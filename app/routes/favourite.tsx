import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import FavPackageList from "../Components/FavPackageList";
import { json } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import { useFetcher } from "@remix-run/react";
import { Outlet } from "@remix-run/react";

import { getFavPackageList } from "~/services/packagesCrud/getFavPackages";
import deletePackage from "~/services/packagesCrud/deletePackage";
import updatePackage from "~/services/packagesCrud/updatePackage";

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
  const packageList: any = useLoaderData();

  return (
    <div className=" h-[100vh] w-full px-[100px] py-[100px] relative">
      {params.slug ? <Outlet /> : <FavPackageList packageList={packageList} />}
    </div>
  );
}

export const action = async ({ request, params }: ActionFunctionArgs) => {
  console.log(request);
  const formdata = await request.formData();
  console.log(formdata);
  const currentCase = formdata.get("currentCase");
  const uuid = formdata.get("uuid");
  if (currentCase === "delete") {
    try {
      const response = await deletePackage({ uuid });
      return json({ success: 1 });
    } catch (e) {
      json({ success: 0 });
    }
  } else {
    try {
      const description = formdata.get("description");
      console.log(description);
      const response = await updatePackage({ uuid, description });
      return json({ success: 1 });
    } catch (e) {
      json({ success: 0 });
    }
  }
};
