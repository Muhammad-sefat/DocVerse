import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import wishlistReducer from "./features/wishlistSlice";
import themeReducer from "./features/themeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    wishlist: wishlistReducer,
    theme: themeReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
