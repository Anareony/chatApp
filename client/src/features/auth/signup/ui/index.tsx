import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Link from "next/link";

import { useSignUpUserMutation } from "../model";

import { ROUTES } from "@/shared/constants/router";
import { AuthProps } from "@/shared/constants/types";

import { Button, FormControl, Link as MuiLink, TextField } from "@mui/material";

export function SignUpForm() {
  const { register, handleSubmit } = useForm<AuthProps>();
  const [signUpUser, { isLoading, isSuccess }] = useSignUpUserMutation();
  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      console.log("signup");
      router.replace(ROUTES.HOME);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const onSubmitHandler: SubmitHandler<AuthProps> = (data) => {
    console.log(data);
    signUpUser(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <FormControl
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <h2>Sign Up</h2>
        <TextField {...register("email")} name="email" label="Email" />
        <TextField
          {...register("password")}
          name="password"
          label={"Password"}
          type="password"
        />
        <Button type="submit" variant="contained">
          Confirm
        </Button>
        <MuiLink href={ROUTES.SIGN_IN} component={Link}>
          Sign In
        </MuiLink>
      </FormControl>
    </form>
  );
}
