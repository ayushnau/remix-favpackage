import type { MetaFunction } from "@remix-run/node";
import FavPackageList from "../Components/FavPackageList";
import { json } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import { useFetcher } from "@remix-run/react";
import { Outlet } from "@remix-run/react";

import { webStore, webPersistor } from "../store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { getFavPackageList } from "~/services/packagesCrud/getFavPackages";

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
    <div className="bg-slate-200 h-[100vh] w-full px-[100px] py-[100px] relative">
      {params.slug ? <Outlet /> : <FavPackageList packageList={packageList} />}
    </div>
  );
}
