import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import verficationSlice from "./verification-slice";

const store = configureStore({
  reducer: { auth: authSlice, verification: verficationSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
