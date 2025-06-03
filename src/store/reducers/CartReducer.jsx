import { createSlice } from "@reduxjs/toolkit";

export const initialState = JSON.parse(localStorage.getItem("cart")) ?? [];

const cartReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.push(action.payload);
    },
    deleteFromCart: (state, action) => {
      return state.filter((item) => item.id != action.payload.id);
    },
  },
});

export const { addToCart, deleteFromCart } = cartReducer.actions;

export default cartReducer.reducer;
