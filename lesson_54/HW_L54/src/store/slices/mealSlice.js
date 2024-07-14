import { createSlice } from '@reduxjs/toolkit'

// const initialState = [{
//   id: '',
//   name: '',
//   ingredients: [],
// }]

export const mealSlice = createSlice({
  name: 'meals',
  initialState: [],
  reducers: {
    addMeal: (state, action) => {
      const ifMealAlreadyAdded = state?.find((item) => item.id === action.payload.id)
      if (!ifMealAlreadyAdded) {
        state.push(action.payload);

        // state = [...state, action.payload]
        // state.push(action.payload) -> [data].slice()
      }
    },
    removeMeal: (state, action) => {
      const ifMealWasAddedBefore = state?.findIndex((item) => item.id === action.payload.id)
      if (ifMealWasAddedBefore >= 0) {
        state.splice(ifMealWasAddedBefore, 1)
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { addMeal, removeMeal } = mealSlice.actions

export default mealSlice.reducer