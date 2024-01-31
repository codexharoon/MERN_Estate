import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  error: false,
  errorMsg: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // for sign in
    signInStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    signInSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = false;
      state.errorMsg = "";
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = true;
      state.errorMsg = action.payload;
    },
    // for update user
    userUpdateStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    userUpdateSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = false;
      state.errorMsg = "";
    },
    userUpdateFailure: (state, action) => {
      state.loading = false;
      state.error = true;
      state.errorMsg = action.payload;
    },
    // for delete user
    userDeleteStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    userDeleteSuccess: (state) => {
      state.user = null;
      state.loading = false;
      state.error = false;
      state.errorMsg = "";
    },
    userDeleteFailure: (state, action) => {
      state.loading = false;
      state.error = true;
      state.errorMsg = action.payload;
    },
    // for logout
    userLogout: (state) => {
      state.user = null;
      state.loading = false;
      state.error = false;
      state.errorMsg = "";
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  userUpdateStart,
  userUpdateSuccess,
  userUpdateFailure,
  userDeleteStart,
  userDeleteSuccess,
  userDeleteFailure,
  userLogout,
} = userSlice.actions;
export default userSlice.reducer;
