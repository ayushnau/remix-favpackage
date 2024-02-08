import React, { useEffect, useState, useRef } from "react";
import EyeIcon from "./icons/EyeIcon";
import EyeIconOpened from "./icons/EyeIconOpened";
import { useActionData, useNavigate } from "@remix-run/react";
import { Link } from "@remix-run/react";
import EditIcon from "./icons/EditIcon";
import DeleteIcon from "./icons/DeleteIcon";
import deletePackage from "~/services/packagesCrud/deletePackage";
import { useSubmit } from "@remix-run/react";
import { action } from "~/routes/add-favorite-package";
import ShowDeleteModal from "./Modals/ShowDeleteModal";
import ShowLoadingModal from "./Modals/ShowLoadingModal";
import LoadingComponent from "./Micallenous/LoadingComponent";
import ShowSomethingWentWrongModal from "./Modals/ShowSomethingWentWrongModal";

interface PackageListProps {
  packageList: any[];
}
const PackageList: React.FC<PackageListProps> = ({ packageList }) => {
  const navigate = useNavigate();
  const submit = useSubmit();
  let state: any = useActionData();
  console.log(state);

  const [isLoading, setIsLoading] = useState<any>(false);

  const confirmationRunningRef = useRef(false);
  useEffect(() => {
    console.log({ isLoading });
    if (isLoading == false) {
      state = undefined;
      console.log(state);
    }
  }, [isLoading]);
  useEffect(() => {
    console.log({ state });
    if (state?.success) {
      setIsLoading(false);
    }

    if (state?.success == false && confirmationRunningRef.current == false) {
      confirmationRunningRef.current = true;
      setIsLoading(false);
      (async () => {
        await ShowSomethingWentWrongModal({});
      })();
    }
  }, [state]);
  // useEffect(() => {
  //   console.log(state);
  //   if (state) {
  //     setIsLoading(false);
  //   }
  // }, []);

  return (
    <>
      {isLoading ? <LoadingComponent /> : ""}

      <div className="border-2 border-black rounded-md w-full h-full px-[50px] py-[35px] overflow-scroll">
        <button
          onClick={() => navigate("/add-favorite-package")}
          className="px-4 py-2 mb-4 w-fit text-end border ml-auto bg-blue-600 text-cyan-50  rounded-md  border-blue-600 fixed top-[20px] right-[100px]"
        >
          + Add Package
        </button>
        <div className="text-xl flex flex-start">
          <div className="flex-1 font-xl">PackageName</div>
          <div className="flex-1 font-xl">Actions</div>
        </div>

        <div className="overflow-scroll">
          <div>
            {packageList?.map((currentFav: any) => {
              return (
                <div
                  key={currentFav.uuid}
                  className="flex mt-4 border border-b-black pb-3 "
                >
                  <div className="flex-1">{currentFav.name}</div>

                  <div className="flex-1 items-center flex gap-x-2">
                    <div
                      onClick={() => navigate(`${currentFav.uuid}`)}
                      className="w-5 h-5"
                    >
                      <EyeIconOpened />
                    </div>
                    <div
                      onClick={() => navigate(`edit/${currentFav.uuid}`)}
                      className=""
                    >
                      <EditIcon />
                    </div>
                    <div
                      onClick={async () => {
                        const response = await ShowDeleteModal({});
                        console.log(response);
                        // await new Promise((resolve) =>
                        //   setTimeout(resolve, 5000)
                        // );
                        if (response == true) {
                          setIsLoading(true);
                          submit(
                            { uuid: currentFav.uuid, currentCase: "delete" },
                            { method: "POST", action: "/favourite" }
                          );
                        }
                      }}
                      className=""
                    >
                      <DeleteIcon />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default PackageList;
