import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API, STATUS } from "../../constants";

export const fetchMealById = createAsyncThunk(
  'cart/fetchMealById',
  async (idMeal, thunkAPI) => {
    const store = thunkAPI.getState()
    console.log('store', store);


    try {
      const response = await fetch(`${API.mealId}${idMeal}`)
      // if (response.ok) {
      //   thunkAPI.dispatch(removeMeal(idMeal))
      // }
      const data = await response.json()


      // throw new Error(`Meal ${idMeal} not found`)
      return data?.meals?.[0]
    } catch(error) {
      thunkAPI.rejectWithValue('error')
    }

  }
)

const initialState = {
  meals: {},
  status: STATUS.IDLE,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    // remove: (state, action) => {
    //   const ifMealAlreadyAdded = state?.find((item) => item.id === action.payload.id)
    //   if (!ifMealAlreadyAdded) {
    //     state.push(action.payload);
    //
    //     // state = [...state, action.payload]
    //     // state.push(action.payload) -> [data].slice()
    //   }
    // },
    // removeMeal: (state, action) => {
    //   const ifMealWasAddedBefore = state?.findIndex((item) => item.id === action.payload.id)
    //   if (ifMealWasAddedBefore >= 0) {
    //     state.splice(ifMealWasAddedBefore, 1)
    //   }
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMealById.pending, (state, action) => {
      state.status = STATUS.LOADING;
    })
    builder.addCase(fetchMealById.fulfilled, (state, action) => {
      // console.log(action.payload);
      state.meals[action.payload.idMeal] = action.payload;
      state.status = STATUS.IDLE;
    })
    builder.addCase(fetchMealById.rejected, (state, action) => {
      state.status = STATUS.ERROR;
    })
  }
})

// Action creators are generated for each case reducer function
export const { removeMeal } = cartSlice.actions

export default cartSlice.reducer