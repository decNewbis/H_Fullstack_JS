import { createSlice } from "@reduxjs/toolkit";
import {mockCourses} from "../../pages/CoursesPage/mock";

const initialState = {
  courseList: [...mockCourses],
};

export const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse: (state, action) => {
      state.courseList.push(action.payload);
    },
    saveCourse: (state, action) => {
      let index = state.courseList.findIndex((course) => course.id === action.payload.id);
      if (index !== -1) {
        state.courseList[index] = {
          ...state.courseList[index],
          ...action.payload
        };
      }
    },
    deleteCourse: (state, action) => {
      state.courseList = state.courseList.filter((course) => course.id !== action.payload);
    },
  }
});

export const { addCourse, saveCourse, deleteCourse } = courseSlice.actions;
export default courseSlice.reducer;