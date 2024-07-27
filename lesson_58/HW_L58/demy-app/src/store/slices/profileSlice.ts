import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {v4 as uuidv4} from 'uuid';

interface FavoriteItem {
  id: string;
  title: string;
  author: string;
  link: string;
  description: string;
}

interface ProfileState {
  userId: string;
  firstName: string;
  lastName: string;
  favoriteList: FavoriteItem[];
}

const initialState: ProfileState = {
  userId: uuidv4(),
  firstName: "Admin",
  lastName: "Admin",
  favoriteList: [],
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    addToFavorite: (state, action: PayloadAction<FavoriteItem>) => {
      const isExist = state.favoriteList.find((item) => item.id === action.payload.id);
      if(!isExist) {
        state.favoriteList.push(action.payload);
      }
    },
    deleteFromFavorite: (state, action: PayloadAction<string>) => {
      state.favoriteList = state.favoriteList.filter((item) => item.id !== action.payload);
    }
  }
});

export const {addToFavorite, deleteFromFavorite} = profileSlice.actions;
export default profileSlice.reducer;