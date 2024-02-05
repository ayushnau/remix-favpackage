import React, { useState } from "react";
import EyeIcon from "./icons/EyeIcon";
import EyeIconOpened from "./icons/EyeIconOpened";
import { useNavigate } from "@remix-run/react";
import { Link } from "@remix-run/react";
import EditIcon from "./icons/EditIcon";
import DeleteIcon from "./icons/DeleteIcon";
import deletePackage from "~/services/packagesCrud/deletePackage";
import { useSubmit } from "@remix-run/react";
import { action } from "~/routes/add-favorite-package";
import ShowDeleteModal from "./Modals/ShowDeleteModal";
import ShowLoadingModal from "./Modals/ShowLoadingModal";

interface PackageListProps {
  packageList: any[];
}
const PackageList: React.FC<PackageListProps> = ({ packageList }) => {
  const navigate = useNavigate();
  const submit = useSubmit();
  const [isLoading, setIsLoading] = useState(false);

  // const handleDelete = (uuid: any) => {
  //   deletePackage(uuid);
  // };

  return (
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
                      if (response) {
                        submit(
                          { uuid: currentFav.uuid },
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
  );
};

export default PackageList;
