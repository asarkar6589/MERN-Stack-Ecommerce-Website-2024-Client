import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import { cancellOrderAPI } from "./api/cancelledOrder";
import { commentAPI } from "./api/comment";
import { couponAPI } from "./api/coupon";
import { feedbackAPI } from "./api/feedback";
import { orderAPI } from "./api/order";
import { payementAPI } from "./api/payement";
import { productAPI } from "./api/product";
import { statsAPI } from "./api/stats";
import { userAPI } from "./api/user";
import { cartReducer } from "./reducer/cartReducer";
import { userReducer } from "./reducer/userReducer";

const store = configureStore({
  reducer: {
    [cartReducer.name]: cartReducer.reducer,
    [userReducer.name]: userReducer.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [productAPI.reducerPath]: productAPI.reducer,
    [commentAPI.reducerPath]: commentAPI.reducer,
    [couponAPI.reducerPath]: couponAPI.reducer,
    [orderAPI.reducerPath]: orderAPI.reducer,
    [payementAPI.reducerPath]: payementAPI.reducer,
    [cancellOrderAPI.reducerPath]: cancellOrderAPI.reducer,
    [statsAPI.reducerPath]: statsAPI.reducer,
    [feedbackAPI.reducerPath]: feedbackAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userAPI.middleware,
      productAPI.middleware,
      commentAPI.middleware,
      couponAPI.middleware,
      orderAPI.middleware,
      payementAPI.middleware,
      cancellOrderAPI.middleware,
      statsAPI.middleware,
      feedbackAPI.middleware
    ),
});

export const persistor = persistStore(store);

export default store;
