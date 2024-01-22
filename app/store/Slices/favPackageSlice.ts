import { createSlice } from "@reduxjs/toolkit";

export const favPackageSlice = createSlice({
  name: "favpackage",
  initialState: {
    packagesList : []
  },

  reducers: {
    setFavPackage: (state, action) => {
      state.packagesList = { ...state.packagesList, ...action.payload };
    },
    clearFavPackages: (state) => {
      state.packagesList = []
    },
  },
});

export const { setFavPackage, clearFavPackages } = favPackageSlice.actions;

export default favPackageSlice.reducer;
