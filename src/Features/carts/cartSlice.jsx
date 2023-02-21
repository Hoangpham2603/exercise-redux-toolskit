import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";
import axios from 'axios'

const url = "https://course-api.com/react-useReducer-cart-project";

const initialState = {
  cartItem: [],
  amount: 1,
  total: 0,
  isLoading: true,
};

export const getCartItems = createAsyncThunk("cart/getCartItems",async () => {
  try {
    const resp = await axios(url)
    return resp.data;
  } catch (err) {
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state, action) => {
      state.cartItem = [];
    },
    removeItem: (state, action) => {
      const itemID = action.payload;
      state.cartItem = state.cartItem.filter((item) => item.id !== itemID);
    },
    increase: (state, action) => {
      const CartItems = state.cartItem.find(
        (item) => item.id === action.payload.id
      );
      CartItems.amount = CartItems.amount + 1;
    },
    decrease: (state, action) => {
      const CartItems = state.cartItem.find(
        (item) => item.id === action.payload.id
      );
      CartItems.amount = CartItems.amount - 1;
    },
    calculateTotal: (state, action) => {
      let amount = 0;
      let total = 0;
      state.cartItem.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
  extraReducers: {
    [getCartItems.pending] : (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled] : (state, action) => {
      state.isLoading = false;
      state.cartItem = action.payload
    },
    [getCartItems.rejected] : (state) => {
      state.isLoading = false;
    }
  }
});

export const { clearCart, removeItem, increase, decrease, calculateTotal } =
  cartSlice.actions;

export default cartSlice.reducer;
