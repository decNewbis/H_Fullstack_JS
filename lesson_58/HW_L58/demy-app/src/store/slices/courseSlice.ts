import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {mockCourses} from "../../pages/CoursesPage/mock";

interface CourseItem {
  id: string;
  title: string;
  author: string;
  link: string;
  description: string;
}

interface CourseState {
  courseList: CourseItem[];
}

const initialState: CourseState = {
  courseList: [...mockCourses],
};

export const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse: (state, action: PayloadAction<CourseItem>) => {
      state.courseList.push(action.payload);
    },
    saveCourse: (state, action: PayloadAction<CourseItem>) => {
      let index: number = state.courseList.findIndex((course) => course.id === action.payload.id);
      if (index !== -1) {
        state.courseList[index] = {
          ...state.courseList[index],
          ...action.payload
        };
      }
    },
    deleteCourse: (state, action: PayloadAction<string>) => {
      state.courseList = state.courseList.filter((course) => course.id !== action.payload);
    },
  }
});

export const { addCourse, saveCourse, deleteCourse } = courseSlice.actions;
export default courseSlice.reducer;