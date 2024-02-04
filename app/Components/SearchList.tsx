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
  const handleSubmit = (e: any) => {
    // submit(
    //   {[
    //     { name: "packageName", value: "name" },
    //     { name: "packageDescription", value: "description" },
    //   ]},
    //   { method: "POST" }
    // );
  };
  return (
    <div className="border-2 border-black rounded-xl w-full h-full overflow-auto px-[50px] py-[10px]">
      <form method="post" className="flex items-center gap-3">
        <input
          name="searchQuery"
          className="border border-black px-4 py-2 rounded-xl w-full font-extrabold"
          placeholder="Search the package here..."
        />
        <button type="submit">Search</button>
      </form>

      <Form
        action="/handleFormData"
        method="post"
        className="flex items-center gap-3 w-full flex-col"
        encType="multipart/form-data"
        onSubmit={(event) => {
          console.log(event.currentTarget);
          submit(event.currentTarget);
        }}
      >
        <div className="border border-xl rounded-xl w-full h-[55vh] overflow-scroll">
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

        <input
          className="w-full h-[10vh] border border-black rounded-xl"
          name="packageDescription"
          type="text"
        />
        <input type="file" name="fav_image" id="" />
        <button
          className="px-4 py-2 border border-black rounded-xl w-full"
          type="submit"
        >
          Enter
        </button>
      </Form>
    </div>
  );
};

export default SearchList;
