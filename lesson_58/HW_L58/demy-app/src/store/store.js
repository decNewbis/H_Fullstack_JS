import { configureStore } from "@reduxjs/toolkit";
import courseSlice from "./slices/courseSlice";
import profileSlice from "./slices/profileSlice";

export const store = configureStore({
  reducer: {
    courses: courseSlice,
    profile: profileSlice,
  },
});