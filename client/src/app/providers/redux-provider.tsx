import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { patchAccountApi } from "@/features/edit-info/model";
import { getAccountApi } from "@/entities/account";
import { authApi } from "@/shared/api";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [patchAccountApi.reducerPath]: patchAccountApi.reducer,
    [getAccountApi.reducerPath]: getAccountApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      authApi.middleware,
      patchAccountApi.middleware,
      getAccountApi.middleware,
    ]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export function ReduxProvider({ children }: { children?: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
