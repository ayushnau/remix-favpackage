import React, { useState } from "react";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/react";

interface SearchListProps {
  packageList: any;
}
import { getPackageListFromApi } from "~/services/getPackageListFromApi";

const SearchList: React.FC<SearchListProps> = ({ packageList }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSetQuery = (e: any) => {
    setSearchQuery(e.target.value);
  };
  return (
    <div className="border-2 border-black rounded-xl w-full h-full px-[50px] py-[35px]">
      <form method="post" className="flex items-center gap-3">
        <input
          name="searchQuery"
          className="border border-black px-4 py-2 rounded-xl w-full font-extrabold"
          placeholder="Search the package here..."
          value={"node"}
        />
        <button type="submit">Search</button>
      </form>
      {/* <form method="post" className="flex items-center gap-3"> */}
      <div className="border border-xl rounded-xl">
        {packageList.map((value: any, index: any) => {
          console.log(value);
          return (
            <div key={index}>
              <input
                type="radio"
                // checked={searchQuery === value.package.name}
                // onChange={() => handleSetQuery(value.package.name)}
              />
              <button className="ml-2" type="submit">
                {value.package.name}
              </button>
            </div>
          );
        })}
      </div>
      {/* </form> */}
    </div>
  );
};

export default SearchList;
