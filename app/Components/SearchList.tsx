import React, { useState } from "react";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/react";
import { FormEvent } from "react";
import { useSubmit } from "@remix-run/react";
import { Form } from "@remix-run/react";

interface SearchListProps {
  packageList: any;
  searchQuery: string;
}
import { getPackageListFromApi } from "~/services/Search/getPackageListFromApi";

const SearchList: React.FC<SearchListProps> = ({
  packageList,
  searchQuery,
}) => {
  const submit = useSubmit();

  return (
    <div className="border-2 border-black rounded-md w-full h-full overflow-auto px-[50px] py-[40px]">
      <form method="post" className="flex items-center gap-3 relative pt-6">
        <label className="absolute -top-1 left-1" htmlFor="searchQuery">
          Search Package...
        </label>
        <input
          id="searchQuery"
          name="searchQuery"
          className="border border-black px-4 py-2 rounded-md w-full font-extrabold"
          placeholder="Search the package here..."
        />
        <button type="submit">Search</button>
      </form>

      <Form
        action="/handleFormData"
        method="post"
        className="flex items-center gap-3 w-full flex-col relative mt-5"
        encType="multipart/form-data"
        onSubmit={(event) => {
          submit(event.currentTarget);
        }}
      >
        <div className=" absolute left-0  -top-2 mb-3">Result</div>
        <div className="border border-xl w-full h-[30vh] overflow-scroll relative  rounded-md px-4 py-3 mt-5">
          {packageList?.map((value: any, index: any) => {
            return (
              <div className="flex items-center " key={index}>
                <input
                  name={value.package.name}
                  type="radio"
                  id={value.package.name}
                />
                <div className="ml-2">{value.package.name}</div>
              </div>
            );
          })}
        </div>

        <div className="relative w-full mt-5">
          <div className=" absolute left-0  -top-6 mb-3">Description</div>
          <textarea
            className="w-full h-[10vh] border border-black rounded-md px-2 py-2"
            name="packageDescription"
          />
        </div>
        <input type="file" name="fav_image" id="" />
        <button
          className="px-4 py-2 border ml-auto bg-blue-600 text-cyan-50  rounded-md  border-blue-600"
          type="submit"
        >
          Enter
        </button>
      </Form>
    </div>
  );
};

export default SearchList;
