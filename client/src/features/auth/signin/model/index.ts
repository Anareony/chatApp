import { authApi } from "@/shared/api";

export const signInApi = authApi.injectEndpoints({
  endpoints: (builder) => ({
    signInUser: builder.mutation<any, any>({
      query({ email, password }) {
        return {
          url: "/auth/sign-in",
          method: "POST",
          body: { email: email, password: password },
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useSignInUserMutation } = signInApi;
