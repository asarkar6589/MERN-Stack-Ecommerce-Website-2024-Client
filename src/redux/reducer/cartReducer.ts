import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  ShippingAddress,
  cartItemsType,
  initialCartStateType,
} from "../../types/initialState-types";

const initialState: initialCartStateType = {
  loading: false,
  cartItems: [],
  subtotal: 0,
  shippingCharge: 0,
  tax: 0,
  discount: 0,
  total: 0,
  shippingAddress: {
    address: "",
    city: "",
    country: "",
    pinCode: 0,
  },
};

export const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    addToCartFun: (state, action: PayloadAction<cartItemsType>) => {
      // check -> If the item already exists or not. If the element is already present, then there is no need to add it again.

      state.loading = true;

      const index = state.cartItems.findIndex(
        (i) => i.id === action.payload.id
      );

      if (index === -1) {
        state.cartItems.push(action.payload);
      } else {
        state.cartItems[index] = action.payload;
      }

      state.loading = false;
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      // here we will just take the id of the product and remove it from the cart array (filter)

      state.loading = true;
      state.cartItems = state.cartItems.filter((c) => c.id != action.payload);
      state.loading = false;
    },
    calculatePrice: (state) => {
      state.loading = true;

      if (state.cartItems.length === 0) {
        state.discount = 0;
        state.subtotal = 0;
        state.tax = 0;
        state.total = 0;
      } else {
        // subtotal
        let total = 0;
        for (let i = 0; i < state.cartItems.length; i++) {
          total += state.cartItems[i].price * state.cartItems[i].quantity;
        }
        state.subtotal = total;

        // shipping charges
        if (state.subtotal > 500) {
          state.shippingCharge = 0;
        } else {
          state.shippingCharge = 50;
        }

        // tax
        state.tax = Math.round(state.subtotal * 0.18); // 18% of the total amount

        // discount -> We will calculate it on the time of billing
        state.total =
          state.subtotal + state.shippingCharge + state.tax - state.discount;
      }
    },
    calculateDiscount: (state, action: PayloadAction<number>) => {
      if (state.cartItems.length === 0) {
        state.discount = 0;
      } else {
        state.discount = action.payload;
      }
    },
    saveShippingInfo: (state, action: PayloadAction<ShippingAddress>) => {
      state.shippingAddress = action.payload;
    },
    resetCart: () => initialState,
  },
});

export const {
  addToCartFun,
  removeFromCart,
  calculatePrice,
  calculateDiscount,
  resetCart,
  saveShippingInfo,
} = cartReducer.actions;
