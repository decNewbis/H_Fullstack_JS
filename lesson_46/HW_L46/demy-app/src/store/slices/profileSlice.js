import {createSlice} from "@reduxjs/toolkit";
import {v4 as uuidv4} from 'uuid';

const initialState = {
  userId: uuidv4(),
  firstName: "Admin",
  lastName: "Admin",
  favoriteList: [],
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    addToFavorite: (state, action) => {
      const isExist = state.favoriteList.find((item) => item.id === action.payload.id);
      if(!isExist) {
        state.favoriteList.push(action.payload);
      }
    },
    deleteFromFavorite: (state, action) => {
      state.favoriteList = state.favoriteList.filter((item) => item.id !== action.payload);
    }
  }
});

export const {addToFavorite, deleteFromFavorite} = profileSlice.actions;
export default profileSlice.reducer;