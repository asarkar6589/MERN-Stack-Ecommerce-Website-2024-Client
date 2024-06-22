import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
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

const persistConfiguration = {
  key: "root",
  version: 1,
  storage,
  serialize: true,
  blacklist: [userReducer.name, userAPI.reducerPath],
};

const reducer = combineReducers({
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
});

const persistedReducer = persistReducer(persistConfiguration, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
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
