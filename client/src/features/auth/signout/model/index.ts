import { authApi } from "@/shared/api";

export const signOutApi = authApi.injectEndpoints({
  endpoints: (builder) => ({
    signOutUser: builder.mutation<void, void>({
      query() {
        return {
          url: "/auth/sign-out",
          method: "POST",
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useSignOutUserMutation } = signOutApi;
