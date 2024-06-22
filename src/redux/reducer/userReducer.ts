import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialUserStateType } from "../../types/initialState-types";
import { User } from "../../types/api-types";

const initialState: initialUserStateType = {
  user: null,
  loading: true,
};

export const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    getUserInfo: (state, action: PayloadAction<User>) => {
      // console.log('Dispatched getUserInfo:', action.payload); // Debugging line
      state.loading = false;
      state.user = action.payload;
    },
    noUser: (state) => {
      // console.log('Dispatched noUser'); // Debugging line
      state.loading = false;
      state.user = null;
    },
  },
});

export const { getUserInfo, noUser } = userReducer.actions;
