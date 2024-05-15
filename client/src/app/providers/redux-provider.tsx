import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { signUpApi } from "@/features/auth/signup/model";
import { signInApi } from "@/features/auth/signin/model";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { signOutApi } from "@/features/auth/signout/model";
import { getAccountApi } from "@/pages/home";
import { patchAccountApi } from "@/pages/edit";

export const store = configureStore({
  reducer: {
    [signUpApi.reducerPath]: signUpApi.reducer,
    [signInApi.reducerPath]: signInApi.reducer,
    [signOutApi.reducerPath]: signOutApi.reducer,
    [patchAccountApi.reducerPath]: patchAccountApi.reducer,
    [getAccountApi.reducerPath]: getAccountApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      signUpApi.middleware,
      signInApi.middleware,
      signOutApi.middleware,
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
