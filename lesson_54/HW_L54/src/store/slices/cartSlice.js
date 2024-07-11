import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API, STATUS } from "../../constants";

export const fetchMealById = createAsyncThunk(
  'cart/fetchMealById',
  async (idMeal, thunkAPI) => {

    try {
      const response = await fetch(`${API.mealId}${idMeal}`)
      const data = await response.json()

      return data?.meals?.[0]
    } catch(error) {
      return thunkAPI.rejectWithValue('error');
    }

  }
);

export const deleteOrder = createAsyncThunk(
  'cart/deleteOrder',
  async (idMeal) => {
    return new Promise((resolve) =>
    setTimeout(() => {
      resolve({idMeal});
    }, 200));
  }
);

const increaseDecreaseValue = (type) => {
  return createAsyncThunk(
    type,
    async (idMeal) => {
      return new Promise((resolve) =>
        setTimeout(() => {
          resolve({idMeal, value: 1});
        }, 200));
    }
  );
};

export const increaseOrder = increaseDecreaseValue('cart/increaseOrder');
export const decreaseOrder = increaseDecreaseValue('cart/decreaseOrder');

const initialState = {
  meals: {},
  orderQuantities: {},
  status: STATUS.IDLE,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMealById.pending, (state, action) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchMealById.fulfilled, (state, action) => {
        const idMeal = action.payload.idMeal;
        state.meals[idMeal] = action.payload;
        state.orderQuantities[idMeal] = 1;
        state.status = STATUS.IDLE;
      })
      .addCase(fetchMealById.rejected, (state, action) => {
        state.status = STATUS.ERROR;
      })
      .addCase(deleteOrder.pending, (state, action) => {
        state.status = STATUS.LOADING;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        const idMeal = action.payload.idMeal;
        delete state.meals[idMeal]
        delete state.orderQuantities[idMeal];
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.status = STATUS.ERROR;
      })

      .addCase(increaseOrder.pending, (state, action) => {
        state.status = STATUS.LOADING;
      })
      .addCase(increaseOrder.fulfilled, (state, action) => {
        const idMeal = action.payload.idMeal;
        const orderQuantity = state.orderQuantities[idMeal];
        if (orderQuantity <= 9999) {
          state.orderQuantities[idMeal] += action.payload.value;
        }
      })
      .addCase(increaseOrder.rejected, (state, action) => {
        state.status = STATUS.ERROR;
      })

      .addCase(decreaseOrder.pending, (state, action) => {
        state.status = STATUS.LOADING;
      })
      .addCase(decreaseOrder.fulfilled, (state, action) => {
        const idMeal = action.payload.idMeal;
        const orderQuantity = state.orderQuantities[idMeal];
          if (orderQuantity > 0) {
            state.orderQuantities[idMeal] -= action.payload.value;
          }
      })
      .addCase(decreaseOrder.rejected, (state, action) => {
        state.status = STATUS.ERROR;
      })
  }
})

// Action creators are generated for each case reducer function
export const { removeMeal } = cartSlice.actions

export default cartSlice.reducer