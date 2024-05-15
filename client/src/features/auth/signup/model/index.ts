import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";import { AuthProps, GenericResponse } from "@/shared/constants/types";

export const signUpApi = createApi({
  reducerPath: "signUpApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    signUpUser: builder.mutation<GenericResponse, AuthProps>({
      query({ email, password }) {
        return {
          url: "/auth/sign-up",
          method: "POST",
          body: { email: email, password: password },
        };
      },
    }),
  }),
});

export const { useSignUpUserMutation } = signUpApi;
