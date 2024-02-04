import React from "react";
import EyeIcon from "./icons/EyeIcon";
import EyeIconOpened from "./icons/EyeIconOpened";
import { useNavigate } from "@remix-run/react";
import { Link } from "@remix-run/react";

interface PackageListProps {
  packageList: any[];
}
const PackageList: React.FC<PackageListProps> = ({ packageList }) => {
  const navigate = useNavigate();

  return (
    <div className="border-2 border-black rounded-xl w-full h-full px-[50px] py-[35px]">
      <button
        onClick={() => navigate("/add-favorite-package")}
        className="border-2 border-red-200 px-4 py-2 rounded-xl fixed top-[20px] right-[100px]"
      >
        + Add Package
      </button>
      <div className="text-xl flex flex-start">
        <div className="flex-1 font-xl">PackageName</div>
        <div className="flex-1 font-xl">Actions</div>
      </div>

      <div className="">
        <div>
          {packageList?.map((currentFav: any) => {
            return (
              <div id={currentFav.uuid} className="flex">
                <div className="flex-1">{currentFav.name}</div>
                {/* <Link to={`${currentFav.uuid}`}> */}
                <div className="flex-1">
                  <div
                    onClick={() => navigate(`${currentFav.uuid}`)}
                    className="w-5 h-5"
                  >
                    <EyeIconOpened />
                  </div>
                </div>
                {/* </Link> */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PackageList;
